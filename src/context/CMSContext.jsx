import React, { createContext, useContext, useState, useEffect } from 'react';
import JSZip from 'jszip';
import { INITIAL_DATA } from '../data/initialData';

const CMSContext = createContext();

const STORAGE_KEY = 'NEXORA_LOGICS_CMS_DATA_V4';

export const CMSProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure system themes are present in themes array even if localStorage had older version
        const systemThemes = INITIAL_DATA.themes || [];
        const existingThemes = parsed.themes || [];
        const themeMap = new Map();
        systemThemes.forEach((st) => themeMap.set(st.id, st));
        existingThemes.forEach((et) => themeMap.set(et.id, et));
        const mergedThemes = Array.from(themeMap.values());

        const activeId = parsed.activeThemeId || INITIAL_DATA.activeThemeId;

        return {
          ...INITIAL_DATA,
          ...parsed,
          themes: mergedThemes,
          activeThemeId: activeId
        };
      }
    } catch (e) {
      console.error('Failed to load CMS data from localStorage:', e);
    }
    return INITIAL_DATA;
  });

  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('NEXORA_ADMIN_AUTH') === 'true';
  });

  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save CMS data to localStorage:', e);
    }
  }, [data]);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // --- Theme & Style Customizer ---
  const updateThemeConfig = (newTheme) => {
    setData((prev) => ({
      ...prev,
      themeConfig: { ...prev.themeConfig, ...newTheme }
    }));
    showToast('Theme styles & color palette updated!');
  };

  // --- Dynamic Page Manager (Add / Edit / Delete Pages) ---
  const addPage = (newPageObj) => {
    let slug = newPageObj.slug.startsWith('/') ? newPageObj.slug : `/${newPageObj.slug}`;
    slug = slug.toLowerCase().replace(/\s+/g, '-');

    const newPage = {
      id: `page-${Date.now()}`,
      slug,
      title: newPageObj.title,
      metaTitle: newPageObj.metaTitle || `${newPageObj.title} — ${data.siteInfo.brandName}`,
      metaDescription: newPageObj.metaDescription || '',
      isSystem: false,
      inNavbar: newPageObj.inNavbar !== false,
      inFooter: newPageObj.inFooter !== false,
      status: newPageObj.status || 'Published',
      date: new Date().toISOString().slice(0, 10),
      sectionIds: newPageObj.sectionIds || ["hero", "contact"]
    };

    setData((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));
    showToast(`New page "${newPage.title}" created at ${newPage.slug}!`);
  };

  const updatePage = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    }));
    showToast('Page details updated successfully!');
  };

  const deletePage = (id) => {
    const pageToDelete = data.pages.find(p => p.id === id);
    if (pageToDelete?.isSystem) {
      alert('System default pages cannot be deleted.');
      return;
    }
    setData((prev) => ({
      ...prev,
      pages: prev.pages.filter((p) => p.id !== id)
    }));
    showToast('Custom page deleted.');
  };

  // --- Posts / Blog Manager CRUD ---
  const addPost = (postObj) => {
    let slug = postObj.slug || postObj.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    const newPost = {
      id: `post-${Date.now()}`,
      title: postObj.title,
      slug,
      category: postObj.category || 'General',
      tags: postObj.tags || ['News'],
      author: postObj.author || 'Admin',
      date: new Date().toISOString().slice(0, 10),
      status: postObj.status || 'Published',
      featuredImage: postObj.featuredImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      excerpt: postObj.excerpt || '',
      content: postObj.content || ''
    };

    setData((prev) => ({
      ...prev,
      posts: [newPost, ...(prev.posts || [])]
    }));
    showToast(`New article "${newPost.title}" published!`);
  };

  const updatePost = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      posts: (prev.posts || []).map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    }));
    showToast('Post updated successfully!');
  };

  const deletePost = (id) => {
    setData((prev) => ({
      ...prev,
      posts: (prev.posts || []).filter((p) => p.id !== id)
    }));
    showToast('Post removed from blog.');
  };

  // --- Media Library CRUD ---
  const addMediaItem = (mediaObj) => {
    const newItem = {
      id: `media-${Date.now()}`,
      name: mediaObj.name || 'Uploaded Asset',
      url: mediaObj.url,
      type: mediaObj.type || 'image/jpeg',
      size: mediaObj.size || '150 KB',
      date: new Date().toISOString().slice(0, 10)
    };
    setData((prev) => ({
      ...prev,
      mediaLibrary: [newItem, ...(prev.mediaLibrary || [])]
    }));
    showToast('Asset added to Media Library!');
  };

  const deleteMediaItem = (id) => {
    setData((prev) => ({
      ...prev,
      mediaLibrary: (prev.mediaLibrary || []).filter((m) => m.id !== id)
    }));
    showToast('Asset removed from Media Library.');
  };

  // --- Dynamic Section Builder (Add Custom Sections to Any Page) ---
  const addCustomSection = (sectionObj) => {
    const newSec = {
      ...sectionObj,
      id: `custom-sec-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSec]
    }));
    showToast('New custom section block created!');
    return newSec.id;
  };

  const updateCustomSection = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    }));
    showToast('Custom section updated!');
  };

  const deleteCustomSection = (id) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== id),
      pages: prev.pages.map((p) => ({
        ...p,
        sectionIds: p.sectionIds.filter((secId) => secId !== id)
      }))
    }));
    showToast('Custom section removed.');
  };

  const updatePageSections = (pageId, newSectionIds) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => (p.id === pageId ? { ...p, sectionIds: newSectionIds } : p))
    }));
    showToast('Page section order updated!');
  };

  // --- Admin Authentication Handlers ---
  const loginAdmin = (passwordInput) => {
    if (passwordInput === data.adminConfig.password) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('NEXORA_ADMIN_AUTH', 'true');
      showToast('WordPress Admin access granted!');
      return true;
    } else {
      alert('Incorrect Password!');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('NEXORA_ADMIN_AUTH');
    navigate('/');
    showToast('Logged out of Admin CMS.');
  };

  const changeAdminPassword = (newPassword) => {
    if (!newPassword || newPassword.trim().length < 4) {
      alert('Password must be at least 4 characters.');
      return;
    }
    setData((prev) => ({
      ...prev,
      adminConfig: { ...prev.adminConfig, password: newPassword.trim() }
    }));
    showToast('Admin password changed successfully!');
  };

  // --- Site Info & Content Handlers ---
  const updateSiteInfo = (newSiteInfo) => {
    setData((prev) => ({ ...prev, siteInfo: { ...prev.siteInfo, ...newSiteInfo } }));
    showToast('Site settings updated successfully!');
  };

  const updateHero = (newHero) => {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, ...newHero } }));
    showToast('Hero section updated successfully!');
  };

  const updateAbout = (newAbout) => {
    setData((prev) => ({ ...prev, about: { ...prev.about, ...newAbout } }));
    showToast('About section content updated!');
  };

  const updateSectionHeader = (sectionKey, newHeaderObj) => {
    setData((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], ...newHeaderObj }
    }));
    showToast('Section headline & copy updated!');
  };

  const toggleSection = (sectionKey) => {
    setData((prev) => {
      const updated = { ...prev.sectionsConfig };
      if (updated[sectionKey]) {
        updated[sectionKey].enabled = !updated[sectionKey].enabled;
      }
      return { ...prev, sectionsConfig: updated };
    });
    showToast('Section visibility updated!');
  };

  // --- Portfolio CRUD ---
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      portfolio: [newProject, ...prev.portfolio]
    }));
    showToast('New project added to portfolio!');
  };

  const updateProject = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    }));
    showToast('Project updated successfully!');
  };

  const deleteProject = (id) => {
    setData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((p) => p.id !== id)
    }));
    showToast('Project removed from portfolio.');
  };

  // --- Services CRUD ---
  const addService = (service) => {
    const newSvc = {
      ...service,
      id: `svc-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newSvc]
    }));
    showToast('New service added!');
  };

  const updateService = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    }));
    showToast('Service details updated!');
  };

  const deleteService = (id) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id)
    }));
    showToast('Service removed.');
  };

  // --- Testimonials CRUD ---
  const addTestimonial = (testimonial) => {
    const newTesti = {
      ...testimonial,
      id: `testi-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, newTesti]
    }));
    showToast('Client review added!');
  };

  const deleteTestimonial = (id) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id)
    }));
    showToast('Testimonial deleted.');
  };

  // --- Inquiries Handlers ---
  const addInquiry = (inquiry) => {
    const newInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString(),
      read: false
    };
    setData((prev) => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries]
    }));
    showToast('Thank you! Your quote request has been sent successfully.');
  };

  const markInquiryAsRead = (id) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq) => (inq.id === id ? { ...inq, read: true } : inq))
    }));
  };

  const deleteInquiry = (id) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((inq) => inq.id !== id)
    }));
    showToast('Inquiry removed from inbox.');
  };

  // --- Backup & Restore ---
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all content back to original defaults?')) {
      setData(INITIAL_DATA);
      localStorage.removeItem(STORAGE_KEY);
      showToast('All website data has been reset to defaults!');
    }
  };

  const exportDataJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `wp_nexora_logics_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('WordPress WXML JSON backup file exported successfully!');
  };

  const importDataJSON = (importedObj) => {
    try {
      if (importedObj && importedObj.siteInfo && importedObj.hero) {
        setData(importedObj);
        showToast('WordPress WXML backup imported and applied!');
      } else {
        alert('Invalid JSON structure.');
      }
    } catch (e) {
      alert('Error importing JSON data.');
    }
  };

  // --- WordPress Theme Engine (ZIP Upload, Extraction, Customizer & Export) ---
  const activateTheme = (themeId) => {
    const targetTheme = (data.themes || []).find((t) => t.id === themeId);
    if (!targetTheme) {
      showToast('Theme not found!');
      return;
    }

    setData((prev) => ({
      ...prev,
      activeThemeId: themeId,
      themeConfig: {
        ...prev.themeConfig,
        primaryAccent: targetTheme.colors?.primaryAccent || prev.themeConfig.primaryAccent,
        secondaryAccent: targetTheme.colors?.secondaryAccent || prev.themeConfig.secondaryAccent,
        amberAccent: targetTheme.colors?.amberAccent || prev.themeConfig.amberAccent,
        bgTheme: targetTheme.colors?.bgTheme || prev.themeConfig.bgTheme,
        cardBg: targetTheme.colors?.cardBg || prev.themeConfig.cardBg,
        fontHeading: targetTheme.typography?.fontHeading || prev.themeConfig.fontHeading,
        fontBody: targetTheme.typography?.fontBody || prev.themeConfig.fontBody,
        customCss: targetTheme.cssContent || prev.themeConfig.customCss
      }
    }));
    showToast(`WordPress Theme "${targetTheme.name}" activated!`);
  };

  const uploadThemeZip = async (file) => {
    try {
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(file);

      let themeName = file.name.replace(/\.zip$/i, '');
      let author = 'Uploaded Theme';
      let version = '1.0.0';
      let description = 'Uploaded WordPress Theme package.';
      let cssContent = '';
      let screenshotUrl = null;
      let extractedFiles = [];

      const fileKeys = Object.keys(zipContent.files);

      for (const relativePath of fileKeys) {
        const zipObj = zipContent.files[relativePath];
        if (zipObj.dir) continue;

        const fileName = relativePath.split('/').pop();
        
        // Extract style.css header comments
        if (fileName.toLowerCase() === 'style.css' && !cssContent) {
          const text = await zipObj.async('string');
          cssContent = text;
          
          const nameMatch = text.match(/Theme Name:\s*([^\n\r]+)/i);
          if (nameMatch) themeName = nameMatch[1].trim();

          const authorMatch = text.match(/Author:\s*([^\n\r]+)/i);
          if (authorMatch) author = authorMatch[1].trim();

          const versionMatch = text.match(/Version:\s*([^\n\r]+)/i);
          if (versionMatch) version = versionMatch[1].trim();

          const descMatch = text.match(/Description:\s*([^\n\r]+)/i);
          if (descMatch) description = descMatch[1].trim();
        }

        // Extract screenshot thumbnail image
        if (/^screenshot\.(png|jpg|jpeg|webp)$/i.test(fileName) && !screenshotUrl) {
          const base64 = await zipObj.async('base64');
          const ext = fileName.split('.').pop().toLowerCase();
          screenshotUrl = `data:image/${ext === 'jpg' ? 'jpeg' : ext};base64,${base64}`;
        }

        let contentStr = '';
        if (/\.(css|json|php|html|txt|md|js)$/i.test(fileName)) {
          contentStr = await zipObj.async('string');
        }
        extractedFiles.push({
          name: fileName,
          path: relativePath,
          content: contentStr
        });
      }

      // Extract palette from theme.json if present
      let themeColors = {
        primaryAccent: '#D2F535',
        secondaryAccent: '#4B4EFF',
        amberAccent: '#FF8A3D',
        bgTheme: '#07090E',
        cardBg: 'rgba(18, 22, 43, 0.75)'
      };

      const themeJsonFile = extractedFiles.find((f) => f.name.toLowerCase() === 'theme.json');
      if (themeJsonFile && themeJsonFile.content) {
        try {
          const parsedJson = JSON.parse(themeJsonFile.content);
          const palette = parsedJson?.settings?.color?.palette || [];
          if (palette[0]?.color) themeColors.primaryAccent = palette[0].color;
          if (palette[1]?.color) themeColors.secondaryAccent = palette[1].color;
        } catch (e) {
          console.warn('Could not parse theme.json:', e);
        }
      }

      const newTheme = {
        id: `theme-wp-${Date.now()}`,
        name: themeName,
        version,
        author,
        description,
        isSystem: false,
        screenshot: screenshotUrl || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
        colors: themeColors,
        typography: {
          fontHeading: "'Space Grotesk', sans-serif",
          fontBody: "'Inter', sans-serif"
        },
        cssContent,
        files: extractedFiles
      };

      setData((prev) => {
        const updatedThemes = [...(prev.themes || []), newTheme];
        return {
          ...prev,
          themes: updatedThemes,
          activeThemeId: newTheme.id,
          themeConfig: {
            ...prev.themeConfig,
            primaryAccent: newTheme.colors.primaryAccent,
            secondaryAccent: newTheme.colors.secondaryAccent,
            customCss: newTheme.cssContent
          }
        };
      });

      showToast(`WordPress Theme "${newTheme.name}" uploaded and activated!`);
      return newTheme;
    } catch (err) {
      console.error('Error extracting WordPress theme ZIP:', err);
      alert(`Failed to extract WordPress theme ZIP: ${err.message}`);
      throw err;
    }
  };

  const deleteTheme = (themeId) => {
    const targetTheme = (data.themes || []).find((t) => t.id === themeId);
    if (!targetTheme) return;
    if (targetTheme.isSystem) {
      alert('System pre-installed themes cannot be deleted.');
      return;
    }
    if (themeId === data.activeThemeId) {
      alert('Cannot delete currently active theme. Please switch to another theme first.');
      return;
    }

    setData((prev) => ({
      ...prev,
      themes: (prev.themes || []).filter((t) => t.id !== themeId)
    }));
    showToast(`Theme "${targetTheme.name}" removed.`);
  };

  const updateThemeCustomization = (themeId, updatedFields) => {
    setData((prev) => {
      const updatedThemes = (prev.themes || []).map((t) => {
        if (t.id === themeId) {
          return { ...t, ...updatedFields };
        }
        return t;
      });

      let updatedConfig = prev.themeConfig;
      if (themeId === prev.activeThemeId) {
        updatedConfig = {
          ...prev.themeConfig,
          primaryAccent: updatedFields.colors?.primaryAccent || prev.themeConfig.primaryAccent,
          secondaryAccent: updatedFields.colors?.secondaryAccent || prev.themeConfig.secondaryAccent,
          amberAccent: updatedFields.colors?.amberAccent || prev.themeConfig.amberAccent,
          bgTheme: updatedFields.colors?.bgTheme || prev.themeConfig.bgTheme,
          cardBg: updatedFields.colors?.cardBg || prev.themeConfig.cardBg,
          fontHeading: updatedFields.typography?.fontHeading || prev.themeConfig.fontHeading,
          fontBody: updatedFields.typography?.fontBody || prev.themeConfig.fontBody,
          customCss: updatedFields.cssContent !== undefined ? updatedFields.cssContent : prev.themeConfig.customCss
        };
      }

      return {
        ...prev,
        themes: updatedThemes,
        themeConfig: updatedConfig
      };
    });
    showToast('Theme customizations saved successfully!');
  };

  const exportThemeZip = async (themeId) => {
    const theme = (data.themes || []).find((t) => t.id === themeId);
    if (!theme) return;

    try {
      const zip = new JSZip();
      const folderName = theme.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const folder = zip.folder(folderName);

      if (theme.files && theme.files.length > 0) {
        theme.files.forEach((f) => {
          if (f.name.toLowerCase() === 'style.css') {
            folder.file(f.path || f.name, theme.cssContent || f.content || '');
          } else {
            folder.file(f.path || f.name, f.content || '');
          }
        });
      } else {
        folder.file('style.css', `/* Theme Name: ${theme.name}\nAuthor: ${theme.author}\nVersion: ${theme.version} */\n${theme.cssContent || ''}`);
        folder.file('index.php', '<?php // WordPress Theme Main Template ?>');
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = URL.createObjectURL(content);
      downloadAnchor.download = `${folderName}-wp-theme.zip`;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast(`WordPress Theme "${theme.name}" exported as ZIP!`);
    } catch (e) {
      console.error('Error exporting theme zip:', e);
      alert('Failed to generate theme ZIP.');
    }
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        currentPath,
        navigate,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        updateThemeConfig,
        activateTheme,
        uploadThemeZip,
        deleteTheme,
        updateThemeCustomization,
        exportThemeZip,
        addPage,
        updatePage,
        deletePage,
        addPost,
        updatePost,
        deletePost,
        addMediaItem,
        deleteMediaItem,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        updatePageSections,
        activeProjectModal,
        setActiveProjectModal,
        toastMessage,
        showToast,
        updateSiteInfo,
        updateHero,
        updateAbout,
        updateSectionHeader,
        toggleSection,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        addTestimonial,
        deleteTestimonial,
        addInquiry,
        markInquiryAsRead,
        deleteInquiry,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
