const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

const config = () => ({
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_SERVICE_ROLE_KEY,
  bootstrapPassword: process.env.CMS_ADMIN_PASSWORD || 'admin123'
});

async function supabaseRequest(path, options = {}) {
  const { url, key } = config();
  if (!url || !key) throw Object.assign(new Error('CMS backend is not configured'), { code: 'NOT_CONFIGURED' });
  return fetch(`${url.replace(/\/$/, '')}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
}

async function readRow() {
  const response = await supabaseRequest('cms_state?id=eq.nexora&select=data&limit=1');
  if (!response.ok) throw new Error(`Supabase read failed (${response.status})`);
  const rows = await response.json();
  return rows?.[0]?.data || null;
}

async function authenticate(req, currentData) {
  const supplied = req.headers['x-cms-password'];
  const expected = currentData?.adminConfig?.password || config().bootstrapPassword;
  return Boolean(supplied && expected && supplied === expected);
}

export default async function handler(req, res) {
  try {
    const currentData = await readRow();

    if (req.method === 'GET') {
      if (!currentData) return json(res, 200, { data: null, configured: true });
      const safe = { ...currentData };
      delete safe.adminConfig;
      return json(res, 200, { data: safe, configured: true });
    }

    if (req.method === 'POST' && req.query?.action === 'auth') {
      const ok = await authenticate(req, currentData);
      return json(res, ok ? 200 : 401, { ok });
    }

    if (req.method === 'POST' && req.query?.action === 'change-password') {
      const ok = await authenticate(req, currentData);
      if (!ok) return json(res, 401, { error: 'Invalid CMS password' });
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const nextPassword = body?.newPassword?.trim();
      if (!nextPassword || nextPassword.length < 4) return json(res, 400, { error: 'Password must be at least 4 characters' });
      const nextData = {
        ...(currentData || {}),
        adminConfig: { ...(currentData?.adminConfig || {}), password: nextPassword }
      };
      const response = await supabaseRequest('cms_state?on_conflict=id', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ id: 'nexora', data: nextData, updated_at: new Date().toISOString() })
      });
      if (!response.ok) throw new Error(`Supabase password update failed (${response.status})`);
      return json(res, 200, { ok: true });
    }

    if (req.method === 'PUT') {
      const ok = await authenticate(req, currentData);
      if (!ok) return json(res, 401, { error: 'Invalid CMS password' });

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body?.data || typeof body.data !== 'object') return json(res, 400, { error: 'Missing CMS data' });

      const response = await supabaseRequest('cms_state?on_conflict=id', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ id: 'nexora', data: body.data, updated_at: new Date().toISOString() })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Supabase write failed (${response.status}): ${text}`);
      }
      return json(res, 200, { ok: true });
    }

    return json(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    if (error.code === 'NOT_CONFIGURED') return json(res, 503, { configured: false, error: 'CMS backend is not configured' });
    console.error(error);
    return json(res, 500, { error: 'CMS server error' });
  }
}
