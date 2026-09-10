import logoImg from '../assets/logo.jpg';
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Globe, 
  Code, 
  Smartphone, 
  BarChart3, 
  Cpu,
  Menu,
  X
} from 'lucide-react';

export const UpworkOutreachPage = () => {
  const { data, navigate } = useCMS();
  const { siteInfo = {} } = data || {};
  const [activeTab, setActiveTab] = useState('c90k');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoSource = siteInfo?.logoUrl || logoImg;

  const handleAuditClick = (e) => {
    e.preventDefault();
    navigate('/contact');
  };

  const handleCaseStudyClick = (e, tabId) => {
    e.preventDefault();
    setActiveTab(tabId);
    const element = document.getElementById('cases');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="upwork-landing-page">
      {/* ---------- SEPARATE MENU / HEADER ---------- */}
      <header className="upwork-header">
        <div className="wrap nav">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="brand" title="Nexora Logics Home">
            <div className="logo-chip">
              <img src={logoSource} alt={siteInfo?.brandName || "Nexora Logics"} className="logo-chip-img" />
            </div>
            <span className="word">{siteInfo?.brandName || "Nexora Logics"}</span>
          </a>

          <nav className="nav-links">
            <a href="#how" onClick={(e) => scrollToSection(e, 'how')}>
              <span className="arrow">↗</span> How it works
            </a>
            <a href="#roi" onClick={(e) => scrollToSection(e, 'roi')}>
              <span className="arrow">↗</span> ROI model
            </a>
            <a href="#packages" onClick={(e) => scrollToSection(e, 'packages')}>
              <span className="arrow">↗</span> Packages
            </a>
            <a href="#cases" onClick={(e) => scrollToSection(e, 'cases')}>
              <span className="arrow">↗</span> Case studies
            </a>
          </nav>

          <a href="#final" onClick={(e) => scrollToSection(e, 'final')} className="btn btn-primary desktop-only-btn">
            Get In Touch
          </a>

          <button 
            className="upwork-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="upwork-mobile-drawer">
            <a href="#how" onClick={(e) => scrollToSection(e, 'how')}>
              <span className="arrow">↗</span> How it works
            </a>
            <a href="#roi" onClick={(e) => scrollToSection(e, 'roi')}>
              <span className="arrow">↗</span> ROI model
            </a>
            <a href="#packages" onClick={(e) => scrollToSection(e, 'packages')}>
              <span className="arrow">↗</span> Packages
            </a>
            <a href="#cases" onClick={(e) => scrollToSection(e, 'cases')}>
              <span className="arrow">↗</span> Case studies
            </a>
            <a href="#final" onClick={(e) => scrollToSection(e, 'final')} className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
              Get In Touch
            </a>
          </div>
        )}
      </header>

      {/* ---------- HERO ---------- */}
      <section className="upwork-hero">
        {/* Floating Geometric Decorative Cubes */}
        <div className="cube cube-1"></div>
        <div className="cube cube-2"></div>
        <div className="cube cube-3"></div>
        <div className="cube cube-4"></div>

        <div className="wrap">
          <div className="pill-label">
            <span>↗</span> UPWORK OUTREACH MANAGEMENT
          </div>
          <h1 className="hero-heading">
            STOP WASTING HOURS BIDDING.
            <br />
            START CLOSING <span className="accent">MORE DEALS</span> ON UPWORK.
          </h1>
          <p className="hero-sub">
            We manage your Upwork account end to end — from optimized proposals to booked meetings. You just focus on closing.
          </p>
          
          <div className="hero-ctas">
            <a href="/contact" onClick={handleAuditClick} className="btn btn-primary">
              Get a free profile audit <small>For existing profiles</small>
            </a>
            <a href="/contact" onClick={handleAuditClick} className="btn btn-outline">
              Get a 3-month roadmap <small>For new profiles</small>
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="v">$65,000</div>
              <div className="k">Earnings, last 6 months</div>
            </div>
            <div className="hero-stat">
              <div className="v">100%</div>
              <div className="k">Job Success Score</div>
            </div>
            <div className="hero-stat">
              <div className="v">358</div>
              <div className="k">Proposals sent</div>
              <a href="#cases" onClick={(e) => handleCaseStudyClick(e, 'c65k')}>
                From our $65K case study ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- WHO WE WORK WITH ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="pill-label on-dark">
              <span>↗</span> WHO WE WORK WITH
            </div>
            <h2>
              BUILT FOR EVERY <span className="accent">GROWTH STAGE</span>
            </h2>
          </div>

          <div className="who-grid">
            <div className="who-card">
              <span className="tag">01 — PROFESSIONALS</span>
              <h3>You've got a job, but want to freelance part-time</h3>
              <p>
                We run the outreach in the background while you keep your day job — proposals go out, calls get booked, you decide what to take on.
              </p>
            </div>
            <div className="who-card">
              <span className="tag">02 — FREELANCERS</span>
              <h3>You're established, but don't have time to bid daily</h3>
              <p>
                Keep the pipeline moving without spending your billable hours writing proposals. We handle the daily grind of outreach.
              </p>
            </div>
            <div className="who-card">
              <span className="tag">03 — AGENCIES</span>
              <h3>Add Upwork as a revenue channel, without extra headcount</h3>
              <p>
                A consistent stream of qualified discovery calls, run by a dedicated outreach team — no new hires required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- INDUSTRIES ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="pill-label on-dark">
              <span>↗</span> WHERE WE WIN
            </div>
            <h2>
              INDUSTRIES WE <span className="accent">THRIVE</span> IN
            </h2>
            <p>We specialize in the niches that consistently convert on Upwork.</p>
          </div>

          <div className="ind-grid">
            <div className="ind-item">
              <Globe className="ind-icon" />
              <span>Website &amp; CMS development</span>
            </div>
            <div className="ind-item">
              <Code className="ind-icon" />
              <span>Custom web development — Node, React, Next.js</span>
            </div>
            <div className="ind-item">
              <Smartphone className="ind-icon" />
              <span>Mobile app development — Flutter, iOS, Android</span>
            </div>
            <div className="ind-item">
              <BarChart3 className="ind-icon" />
              <span>Data management &amp; analytics</span>
            </div>
            <div className="ind-item">
              <Cpu className="ind-icon" />
              <span>AI automation &amp; development</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="section" id="how">
        <div className="wrap">
          <div className="section-head">
            <div className="pill-label on-dark">
              <span>↗</span> THE PROCESS
            </div>
            <h2>
              HOW IT <span className="accent">WORKS</span>
            </h2>
          </div>

          <div className="steps">
            <div className="step">
              <span className="num">01</span>
              <h4>Profile setup &amp; optimization</h4>
              <p>We rebuild your profile to convert — positioning, portfolio, and proposal templates included.</p>
            </div>
            <div className="step">
              <span className="num">02</span>
              <h4>Daily proposal submissions</h4>
              <p>10–15 targeted bids sent every day, matched to projects worth your time.</p>
            </div>
            <div className="step">
              <span className="num">03</span>
              <h4>Meeting booking</h4>
              <p>Around 2–3 discovery calls per week on established profiles, fully scheduled for you.</p>
            </div>
            <div className="step">
              <span className="num">04</span>
              <h4>You close the deals</h4>
              <p>We handle outreach and follow-up. You show up to the call and focus on revenue.</p>
            </div>
          </div>

          <div className="cta-strip">
            <p>See how many meetings we can book for you.</p>
            <a href="/contact" onClick={handleAuditClick} className="btn btn-primary">
              Talk to us
            </a>
          </div>
        </div>
      </section>

      {/* ---------- ROI MODEL ---------- */}
      <section className="section" id="roi">
        <div className="wrap">
          <div className="roi-grid">
            <div>
              <div className="pill-label">
                <span>↗</span> PERFORMANCE COMMITMENT
              </div>
              <h2>
                5× ROI, TIED TO YOUR <span className="accent">CONNECTS SPEND</span>
              </h2>
              <p className="roi-desc">
                We don't believe in vague promises — we believe in measurable outcomes. Your return is directly tied to your Upwork Connects spend. Based on how much you invest, our outreach strategy is built to deliver up to 5× ROI in closed project value.
              </p>

              <div className="roi-example">
                <div className="eq">
                  <span className="in">$100</span> in Connects <span className="eq-arrow">→</span> <span>$500+</span> in project value
                </div>
                <p>Higher Connects budgets let us target larger, premium projects — increasing deal size and ROI potential.</p>
              </div>

              <div className="roi-note">
                ROI performance depends on profile strength, niche competitiveness, response speed, and closing ability. Results may vary for brand-new profiles.
              </div>
            </div>

            <div>
              <ul className="roi-list">
                <li>
                  <b>01</b> You invest in Upwork Connects based on your comfort level.
                </li>
                <li>
                  <b>02</b> We deploy high-intent, data-driven outreach targeting projects that justify that spend.
                </li>
                <li>
                  <b>03</b> Our goal: generate at least 5× the value of your Connects investment in booked and closed opportunities.
                </li>
                <li>
                  <b>04</b> ROI scales with your Connects investment — you control the spend, and there's no wasted bidding on low-quality jobs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIAL ---------- */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="wrap">
          <div className="pill-label on-dark">
            <span>↗</span> PROOF THAT IT WORKS
          </div>
          <div className="quote-block">
            <q>Within 6 weeks, Nexora Logics helped us book 12 qualified meetings — all we had to do was close.</q>
            <cite>Agency Owner, USA</cite>
          </div>
        </div>
      </section>

      {/* ---------- WHY NEXORA LOGICS ---------- */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="wrap">
          <div className="section-head">
            <div className="pill-label on-dark">
              <span>↗</span> WHY NEXORA LOGICS
            </div>
            <h2>
              WHAT YOU <span className="accent">GET</span>, WORKING WITH US
            </h2>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <Calendar className="why-icon" />
              <h4>Steady meetings</h4>
              <p>A predictable pipeline of discovery calls, week over week.</p>
            </div>
            <div className="why-card">
              <Clock className="why-icon" />
              <h4>Save 40+ hours a week</h4>
              <p>No more manual bidding, follow-ups, or inbox management.</p>
            </div>
            <div className="why-card">
              <ShieldCheck className="why-icon" />
              <h4>Premium managed service</h4>
              <p>Strategy-driven outreach run by specialists — not a virtual assistant.</p>
            </div>
            <div className="why-card">
              <MessageSquare className="why-icon" />
              <h4>Flexible partnership</h4>
              <p>Choose a retainer, commission, or a blend of both.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PACKAGES ---------- */}
      <section className="section" id="packages">
        <div className="wrap">
          <div className="section-head">
            <div className="pill-label on-dark">
              <span>↗</span> PACKAGES
            </div>
            <h2>
              UPWORK OUTREACH, <span className="accent">THREE WAYS</span>
            </h2>
            <p>We manage your Upwork outreach end to end — from daily proposals to booked calls. You focus on closing. We handle the pipeline.</p>
          </div>

          <div className="pkg-grid">
            {/* Package 1 */}
            <div className="pkg">
              <span className="tag">LAUNCH PARTNER</span>
              <div className="price">
                30%<small><br />revenue share, no monthly retainer</small>
              </div>
              <h3>Launch Partner</h3>
              <p className="best-for">
                Best for fresh freelancers or new Upwork profiles who want zero upfront cost and are comfortable with performance-based growth.
              </p>
              <ul>
                <li>Daily tailored proposals targeting high-value, relevant projects</li>
                <li>2–3 discovery calls booked per week on established profiles; results vary for fresh ones</li>
                <li>Pre-sales support — SOWs and proposal documents drafted for you</li>
                <li>Weekly performance reports on proposals, responses, and meetings</li>
              </ul>
              <div className="rev-model">We take 30% of project value. No fixed monthly fee.</div>
              <a href="/contact" onClick={handleAuditClick} className="btn btn-outline on-surface">
                Start with Launch Partner
              </a>
            </div>

            {/* Package 2 - Featured */}
            <div className="pkg feature">
              <span className="tag">GROWTH RETAINER</span>
              <div className="price">
                $399<small><br />/mo + 10% commission</small>
              </div>
              <h3>Growth Retainer</h3>
              <p className="best-for">
                Best for mid-level freelancers and consultants with some Upwork history who want a low retainer balanced with performance alignment.
              </p>
              <ul>
                <li>Daily tailored proposals focused on high-intent, high-value opportunities</li>
                <li>2–3 discovery calls booked per week, including inbox management and follow-up</li>
                <li>Pre-sales support — SOWs, pricing breakdowns, and proposal drafts</li>
                <li>Weekly performance reports, fully transparent</li>
              </ul>
              <div className="rev-model">$399 monthly retainer, plus 10% commission on closed projects.</div>
              <a href="/contact" onClick={handleAuditClick} className="btn btn-primary">
                Start with Growth Retainer
              </a>
            </div>

            {/* Package 3 */}
            <div className="pkg">
              <span className="tag">SCALE PRO</span>
              <div className="price">
                $999<small><br />/mo, no commission</small>
              </div>
              <h3>Scale Pro</h3>
              <p className="best-for">
                Best for agencies and high-earning freelancers who want predictable growth without giving up revenue.
              </p>
              <ul>
                <li>Consistent daily proposals targeting premium, high-value projects</li>
                <li>2–3 discovery calls booked per week — full inbox and calendar coordination</li>
                <li>Pre-sales support with professionally drafted SOWs and proposals</li>
                <li>Weekly performance reports with full pipeline and ROI visibility</li>
              </ul>
              <div className="rev-model">Flat $999 monthly fee. Zero commission — you keep 100% of project value.</div>
              <a href="/contact" onClick={handleAuditClick} className="btn btn-outline on-surface">
                Start with Scale Pro
              </a>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="compare-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Launch Partner</th>
                  <th>Growth Retainer</th>
                  <th>Scale Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Best for</td>
                  <td>Fresh freelancers / new profiles</td>
                  <td>Mid-level freelancers</td>
                  <td>Agencies &amp; high earners</td>
                </tr>
                <tr>
                  <td>Monthly fee</td>
                  <td>$0</td>
                  <td>$399</td>
                  <td>$999</td>
                </tr>
                <tr>
                  <td>Commission</td>
                  <td>30% per project</td>
                  <td>10% per project</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>Outreach management</td>
                  <td>Included</td>
                  <td>Included</td>
                  <td>Included</td>
                </tr>
                <tr>
                  <td>Daily tailored proposals</td>
                  <td>High-value targeting</td>
                  <td>High-value targeting</td>
                  <td>High-value targeting</td>
                </tr>
                <tr>
                  <td>Inbox &amp; follow-up management</td>
                  <td>Included</td>
                  <td>Included</td>
                  <td>Included</td>
                </tr>
                <tr>
                  <td>Discovery calls booked</td>
                  <td>Varies for new profiles</td>
                  <td>2–3 / week*</td>
                  <td>2–3 / week*</td>
                </tr>
                <tr>
                  <td>Pre-sales support (SOWs)</td>
                  <td>Included</td>
                  <td>Included</td>
                  <td>Included</td>
                </tr>
                <tr>
                  <td>Weekly performance reports</td>
                  <td>Included</td>
                  <td>Included</td>
                  <td>Included</td>
                </tr>
                <tr>
                  <td>Upfront cost</td>
                  <td>None</td>
                  <td>Low</td>
                  <td>Fixed</td>
                </tr>
                <tr>
                  <td>Revenue ownership</td>
                  <td>70% you / 30% us</td>
                  <td>90% you / 10% us</td>
                  <td>100% you</td>
                </tr>
              </tbody>
            </table>
            <p className="note">* For established Upwork profiles. Results may vary for brand-new accounts.</p>
          </div>
        </div>
      </section>

      {/* ---------- CASE STUDIES ---------- */}
      <section className="section" id="cases" style={{ borderBottom: 'none' }}>
        <div className="wrap">
          <div className="section-head">
            <div className="pill-label on-dark">
              <span>↗</span> CASE STUDIES
            </div>
            <h2>
              PROFILES WE TURNED INTO <span className="accent">BUSINESSES</span>
            </h2>
            <p>Four freelancers and agencies, four different starting points — a combined $224,000 in revenue generated through outreach and positioning.</p>
          </div>

          <div className="tabs" role="tablist">
            <button
              className={`tab-btn ${activeTab === 'c90k' ? 'active' : ''}`}
              onClick={() => setActiveTab('c90k')}
            >
              From zero to $90K
            </button>
            <button
              className={`tab-btn ${activeTab === 'c19k' ? 'active' : ''}`}
              onClick={() => setActiveTab('c19k')}
            >
              $19K in record time
            </button>
            <button
              className={`tab-btn ${activeTab === 'c50k' ? 'active' : ''}`}
              onClick={() => setActiveTab('c50k')}
            >
              $50K, Top Rated agency
            </button>
            <button
              className={`tab-btn ${activeTab === 'c65k' ? 'active' : ''}`}
              onClick={() => setActiveTab('c65k')}
            >
              $65K agency profile
            </button>
          </div>

          {/* CASE 1: $90K */}
          {activeTab === 'c90k' && (
            <div className="case-panel active" id="c90k">
              <div className="case-hero">
                <div>
                  <div className="pill-label">Top Rated Plus achieved</div>
                  <h3>From zero to $90,000 on Upwork</h3>
                  <p className="sub">
                    How outreach, positioning, and a repeatable conversion system turned a quiet freelance profile into a Top Rated Plus business.
                  </p>
                </div>
                <div className="spark-wrap">
                  <div className="spark-label">
                    <span>Revenue over 12 months</span>
                    <span>$90,000</span>
                  </div>
                  <svg viewBox="0 0 300 70" preserveAspectRatio="none">
                    <polyline points="0,65 40,60 80,50 120,42 160,30 200,20 240,10 300,4" fill="none" stroke="#2E7A9E" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              <div className="stat-grid">
                <div className="stat-cell"><div className="k">Industry</div><div className="v">Freelancing</div></div>
                <div className="stat-cell"><div className="k">Goal</div><div className="v">Credibility &amp; clients</div></div>
                <div className="stat-cell"><div className="k">Duration</div><div className="v">12 months</div></div>
                <div className="stat-cell"><div className="k">Revenue</div><div className="v">$90,000</div></div>
              </div>

              <div className="proof-grid">
                <div className="proof-card">
                  <div className="proof-row"><span>12-month earnings</span><span className="v">$90,000</span></div>
                  <div className="proof-jss">
                    <svg className="ring" viewBox="0 0 80 80" width="72" height="72">
                      <circle cx="40" cy="40" r="34" className="ring-bg" />
                      <circle cx="40" cy="40" r="34" className="ring-fg" style={{ strokeDasharray: '213.6', strokeDashoffset: '10.7' }} />
                    </svg>
                    <div className="jss-text"><span className="pct">95%</span><span className="lbl">Job Success Score</span></div>
                  </div>
                </div>
                <div className="proof-card">
                  <div className="funnel-head"><span>Proposals, last 12 months</span><span className="v">550 sent</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '100%' }}></div><span>550 sent</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '38%' }}></div><span>211 viewed</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '11%' }}></div><span>59 interviews</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '4%' }}></div><span>20 hired</span></div>
                </div>
              </div>
              <p className="proof-cap">As shown on the freelancer's live Upwork dashboard.</p>

              <div className="case-split">
                <div className="case-col">
                  <h4>Challenges</h4>
                  <ul>
                    <li>Low visibility in Upwork search</li>
                    <li>Struggling to win projects</li>
                    <li>Inconsistent client communication</li>
                    <li>Lack of credibility signals</li>
                  </ul>
                </div>
                <div className="case-col">
                  <h4>Our approach</h4>
                  <ul className="approach-list">
                    <li data-n="01">Profile optimization — SEO-focused bio and stronger portfolio</li>
                    <li data-n="02">Daily outreach — 12–15 personalized proposals a day</li>
                    <li data-n="03">Brand positioning — expertise and credibility signals</li>
                    <li data-n="04">Conversion strategy — better proposal-to-chat and chat-to-close ratios</li>
                    <li data-n="05">Scaling system — a repeatable process for continuous growth</li>
                  </ul>
                </div>
              </div>

              <div className="case-quote">
                <q>Consistency, outreach, and positioning are the keys to transforming an Upwork profile into a business.</q>
              </div>

              <div className="case-cta">
                <p>Want to scale your Upwork profile too? Let's make it happen.</p>
                <a href="/contact" onClick={handleAuditClick} className="btn btn-primary">
                  Book a free strategy call
                </a>
              </div>
            </div>
          )}

          {/* CASE 2: $19K */}
          {activeTab === 'c19k' && (
            <div className="case-panel active" id="c19k">
              <div className="case-hero">
                <div>
                  <div className="pill-label">Top Rated achieved</div>
                  <h3>Building a profitable $19,000 Upwork profile</h3>
                  <p className="sub">
                    How we built credibility and won clients fast for a freelancer starting from a thin profile history.
                  </p>
                </div>
                <div className="spark-wrap">
                  <div className="spark-label">
                    <span>Revenue over 6 months</span>
                    <span>$19,000</span>
                  </div>
                  <svg viewBox="0 0 300 70" preserveAspectRatio="none">
                    <rect x="0" y="30" width="300" height="14" fill="#2A2A2A" />
                    <rect x="0" y="30" width="220" height="14" fill="#2E7A9E" />
                  </svg>
                </div>
              </div>

              <div className="stat-grid">
                <div className="stat-cell"><div className="k">Industry</div><div className="v">Freelancing</div></div>
                <div className="stat-cell"><div className="k">Status</div><div className="v">Top Rated</div></div>
                <div className="stat-cell"><div className="k">Duration</div><div className="v">6 months</div></div>
                <div className="stat-cell"><div className="k">Revenue</div><div className="v">$19,000</div></div>
              </div>

              <div className="proof-grid">
                <div className="proof-card">
                  <div className="proof-row"><span>12-month earnings</span><span className="v">$19,413</span></div>
                  <div className="proof-jss">
                    <svg className="ring" viewBox="0 0 80 80" width="72" height="72">
                      <circle cx="40" cy="40" r="34" className="ring-bg" />
                      <circle cx="40" cy="40" r="34" className="ring-fg" style={{ strokeDasharray: '213.6', strokeDashoffset: '10.7' }} />
                    </svg>
                    <div className="jss-text"><span className="pct">95%</span><span className="lbl">Job Success Score</span></div>
                  </div>
                </div>
                <div className="proof-card">
                  <div className="funnel-head"><span>Proposals, last 30 days</span><span className="v">270 sent</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '100%' }}></div><span>270 sent</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '44%' }}></div><span>120 viewed</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '9%' }}></div><span>25 interviews</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '4%' }}></div><span>10 hired</span></div>
                </div>
              </div>
              <p className="proof-cap">As shown on the freelancer's live Upwork dashboard.</p>

              <div className="case-split">
                <div className="case-col">
                  <h4>Challenges</h4>
                  <ul>
                    <li>Low visibility</li>
                    <li>Struggling to close clients</li>
                    <li>No outreach system</li>
                  </ul>
                </div>
                <div className="case-col">
                  <h4>Our approach</h4>
                  <ul className="approach-list">
                    <li data-n="01">Profile optimization</li>
                    <li data-n="02">Personalized outreach</li>
                    <li data-n="03">Positioning &amp; branding</li>
                    <li data-n="04">Conversion system</li>
                    <li data-n="05">Growth scaling</li>
                  </ul>
                </div>
              </div>

              <div className="stat-grid" style={{ marginTop: '8px' }}>
                <div className="stat-cell"><div className="k">Combined revenue</div><div className="v">$109,000+</div></div>
                <div className="stat-cell"><div className="k">Freelancers Top Rated</div><div className="v">2</div></div>
                <div className="stat-cell"><div className="k">Chat-to-closure rate</div><div className="v">40%</div></div>
                <div className="stat-cell"><div className="k">Client relationships</div><div className="v">Long-term</div></div>
              </div>

              <div className="case-quote">
                <q>Consistency, outreach, and positioning are the keys to transforming an Upwork profile into a business.</q>
              </div>

              <div className="case-cta">
                <p>Want to scale your Upwork profile too?</p>
                <a href="/contact" onClick={handleAuditClick} className="btn btn-primary">
                  Book a free strategy call
                </a>
              </div>
            </div>
          )}

          {/* CASE 3: $50K */}
          {activeTab === 'c50k' && (
            <div className="case-panel active" id="c50k">
              <div className="case-hero">
                <div>
                  <div className="pill-label">Top Rated agency</div>
                  <h3>Scaling an Upwork agency profile to $50,000</h3>
                  <p className="sub">
                    How our outreach and growth framework transformed an Upwork agency into a Top Rated, revenue-generating business.
                  </p>
                </div>
                <div className="spark-wrap">
                  <div className="spark-label">
                    <span>Revenue milestones over 9 months</span>
                    <span>$50,000</span>
                  </div>
                  <svg viewBox="0 0 300 70" preserveAspectRatio="none">
                    <polyline points="0,65 100,52 200,32 300,6" fill="none" stroke="#2E7A9E" strokeWidth="2.5" />
                    <circle cx="0" cy="65" r="3" fill="#2E7A9E" />
                    <circle cx="100" cy="52" r="3" fill="#2E7A9E" />
                    <circle cx="200" cy="32" r="3" fill="#2E7A9E" />
                    <circle cx="300" cy="6" r="3" fill="#2E7A9E" />
                  </svg>
                </div>
              </div>

              <div className="stat-grid">
                <div className="stat-cell"><div className="k">Type</div><div className="v">Upwork agency</div></div>
                <div className="stat-cell"><div className="k">Status</div><div className="v">Top Rated agency</div></div>
                <div className="stat-cell"><div className="k">Duration</div><div className="v">9 months</div></div>
                <div className="stat-cell"><div className="k">Revenue</div><div className="v">$50,000</div></div>
              </div>

              <div className="proof-grid">
                <div className="proof-card">
                  <div className="proof-row"><span>6-month earnings</span><span className="v">$50,000</span></div>
                  <div className="proof-jss">
                    <svg className="ring" viewBox="0 0 80 80" width="72" height="72">
                      <circle cx="40" cy="40" r="34" className="ring-bg" />
                      <circle cx="40" cy="40" r="34" className="ring-fg" style={{ strokeDasharray: '213.6', strokeDashoffset: '0' }} />
                    </svg>
                    <div className="jss-text"><span className="pct">100%</span><span className="lbl">Job Success Score</span></div>
                  </div>
                </div>
                <div className="proof-card">
                  <div className="funnel-head"><span>Proposals, last 30 days</span><span className="v">400 sent</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '100%' }}></div><span>400 sent</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '39%' }}></div><span>157 viewed</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '10%' }}></div><span>38 interviews</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '4%' }}></div><span>15 hired</span></div>
                </div>
              </div>
              <p className="proof-cap">As shown on the agency's live Upwork dashboard.</p>

              <div className="case-split">
                <div className="case-col">
                  <h4>Challenges</h4>
                  <ul>
                    <li>No outreach system built for agencies</li>
                    <li>Hard to position against individual freelancers</li>
                    <li>Low client trust</li>
                    <li>Poor proposal-to-chat ratio</li>
                  </ul>
                </div>
                <div className="case-col">
                  <h4>Our approach</h4>
                  <ul className="approach-list">
                    <li data-n="01">Profile optimization with agency-focused positioning</li>
                    <li data-n="02">Outreach campaign — daily targeted proposals to businesses</li>
                    <li data-n="03">Authority building through agency case studies</li>
                    <li data-n="04">Conversion strategy — optimized proposals and calls</li>
                    <li data-n="05">Scaling workflow — repeatable bidding and follow-up</li>
                  </ul>
                </div>
              </div>

              <div className="case-quote">
                <q>Agencies can stand out on Upwork with the right mix of outreach, positioning, and credibility building. This is how we helped scale to $50K and Top Rated status.</q>
              </div>

              <div className="case-cta">
                <p>Want to grow your Upwork agency profile too?</p>
                <a href="/contact" onClick={handleAuditClick} className="btn btn-primary">
                  Book a free strategy call
                </a>
              </div>
            </div>
          )}

          {/* CASE 4: $65K */}
          {activeTab === 'c65k' && (
            <div className="case-panel active" id="c65k">
              <div className="case-hero">
                <div>
                  <div className="pill-label">Top Rated agency</div>
                  <h3>Scaling an Upwork agency profile to $65,000</h3>
                  <p className="sub">
                    How our outreach and optimization strategy transformed an agency into a Top Rated business partner on Upwork.
                  </p>
                </div>
                <div className="spark-wrap">
                  <div className="spark-label">
                    <span>Revenue milestones over 10 months</span>
                    <span>$65,000</span>
                  </div>
                  <svg viewBox="0 0 300 70" preserveAspectRatio="none">
                    <polyline points="0,66 75,54 150,38 225,20 300,4" fill="none" stroke="#2E7A9E" strokeWidth="2.5" />
                    <circle cx="0" cy="66" r="3" fill="#2E7A9E" />
                    <circle cx="75" cy="54" r="3" fill="#2E7A9E" />
                    <circle cx="150" cy="38" r="3" fill="#2E7A9E" />
                    <circle cx="225" cy="20" r="3" fill="#2E7A9E" />
                    <circle cx="300" cy="4" r="3" fill="#2E7A9E" />
                  </svg>
                </div>
              </div>

              <div className="stat-grid">
                <div className="stat-cell"><div className="k">Type</div><div className="v">Upwork agency</div></div>
                <div className="stat-cell"><div className="k">Status</div><div className="v">Top Rated agency</div></div>
                <div className="stat-cell"><div className="k">Duration</div><div className="v">10 months</div></div>
                <div className="stat-cell"><div className="k">Revenue</div><div className="v">$65,000</div></div>
              </div>

              <div className="proof-grid">
                <div className="proof-card">
                  <div className="proof-row"><span>6-month earnings</span><span className="v">$65,000</span></div>
                  <div className="proof-jss">
                    <svg className="ring" viewBox="0 0 80 80" width="72" height="72">
                      <circle cx="40" cy="40" r="34" className="ring-bg" />
                      <circle cx="40" cy="40" r="34" className="ring-fg" style={{ strokeDasharray: '213.6', strokeDashoffset: '0' }} />
                    </svg>
                    <div className="jss-text"><span className="pct">100%</span><span className="lbl">Job Success Score</span></div>
                  </div>
                </div>
                <div className="proof-card">
                  <div className="funnel-head"><span>Proposals, last 30 days</span><span className="v">358 sent</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '100%' }}></div><span>358 sent</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '44%' }}></div><span>158 viewed</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '11%' }}></div><span>39 interviews</span></div>
                  <div className="funnel-row"><div className="bar" style={{ width: '5%' }}></div><span>19 hired</span></div>
                </div>
              </div>
              <p className="proof-cap">As shown on the agency's live Upwork dashboard.</p>

              <div className="case-split">
                <div className="case-col">
                  <h4>Challenges</h4>
                  <ul>
                    <li>Low visibility in agency searches</li>
                    <li>Competing with established players</li>
                    <li>Low proposal-to-chat ratio</li>
                    <li>No consistent client acquisition system</li>
                  </ul>
                </div>
                <div className="case-col">
                  <h4>Our approach</h4>
                  <ul className="approach-list">
                    <li data-n="01">Profile optimization — niche-focused description and portfolio</li>
                    <li data-n="02">Outreach campaigns — 12–15 personalized proposals daily</li>
                    <li data-n="03">Authority positioning — team expertise and case studies</li>
                    <li data-n="04">Conversion strategy — proposal templates and call training</li>
                    <li data-n="05">Scaling system — repeatable outreach and follow-up workflow</li>
                  </ul>
                </div>
              </div>

              <div className="case-quote">
                <q>Agencies can thrive on Upwork with the right mix of outreach, authority, and conversion strategy. That's how we helped this agency scale to $65K and beyond.</q>
              </div>

              <div className="case-cta">
                <p>Ready to scale your Upwork agency profile?</p>
                <a href="/contact" onClick={handleAuditClick} className="btn btn-primary">
                  Book a free strategy call
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="section final" id="final" style={{ borderBottom: 'none' }}>
        <div className="wrap">
          <div className="pill-label">
            <span>↗</span> GET STARTED
          </div>
          <h2>
            READY TO UNLOCK UPWORK AS YOUR <span className="accent">GROWTH CHANNEL</span>?
          </h2>
          <p className="sub">
            Get started today with a free profile audit if you have an account, or a 3-month roadmap if you're just starting out.
          </p>
          <a href="/contact" onClick={handleAuditClick} className="btn btn-primary">
            Claim your free profile audit
          </a>
        </div>
      </section>

      {/* ---------- DEDICATED FOOTER ---------- */}
      <footer className="upwork-footer">
        <div className="wrap foot-row">
          <div className="foot-brand">
            <div className="logo-chip">
              <img src={logoSource} alt={siteInfo?.brandName || "Nexora Logics"} className="logo-chip-img" />
            </div>
            <span className="word">{siteInfo?.brandName || "Nexora Logics"} — Upwork Outreach Management</span>
          </div>
          <span>Results vary by profile strength, niche competitiveness, and closing ability.</span>
        </div>
      </footer>
    </div>
  );
};
