import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const CMSContext = createContext();

const STORAGE_KEY = 'NEXORA_LOGICS_CMS_DATA_V1';

export const CMSProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load CMS data from localStorage:', e);
    }
    return INITIAL_DATA;
  });

  const [isAdminView, setIsAdminView] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save CMS data to localStorage:', e);
    }
  }, [data]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // --- Site Info & Hero Handlers ---
  const updateSiteInfo = (newSiteInfo) => {
    setData((prev) => ({ ...prev, siteInfo: { ...prev.siteInfo, ...newSiteInfo } }));
    showToast('Site settings updated successfully!');
  };

  const updateHero = (newHero) => {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, ...newHero } }));
    showToast('Hero section updated successfully!');
  };

  // --- Section Visibility & Order Handlers ---
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
    downloadAnchor.setAttribute("download", `nexora_logics_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('JSON backup file exported successfully!');
  };

  const importDataJSON = (importedObj) => {
    try {
      if (importedObj && importedObj.siteInfo && importedObj.hero) {
        setData(importedObj);
        showToast('JSON backup imported and applied!');
      } else {
        alert('Invalid JSON structure.');
      }
    } catch (e) {
      alert('Error importing JSON data.');
    }
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        isAdminView,
        setIsAdminView,
        activeProjectModal,
        setActiveProjectModal,
        toastMessage,
        showToast,
        updateSiteInfo,
        updateHero,
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
