import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Project,
  CreatorAsset,
  CertificateInfo,
  BlogPost,
  SubdomainType,
} from '../types';
import {
  PROJECTS_SHOWCASE,
  AUDIENCE_ASSETS,
  INITIAL_BLOG_POSTS,
  CERTIFICATES_LIST,
  PERSONAL_INFO,
} from '../data/portfolioData';

interface DataContextType {
  // Subdomain routing
  subdomain: SubdomainType;
  setSubdomain: (sub: SubdomainType) => void;

  // Projects (Videos & Motion Showcase)
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleFeaturedProject: (id: string) => void;

  // Free Audience Assets Vault
  assets: CreatorAsset[];
  addAsset: (asset: Omit<CreatorAsset, 'id'>) => void;
  updateAsset: (id: string, asset: Partial<CreatorAsset>) => void;
  deleteAsset: (id: string) => void;

  // Blog & Case Studies
  blogs: BlogPost[];
  addBlog: (blog: Omit<BlogPost, 'id'>) => void;
  updateBlog: (id: string, blog: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;

  // Certificates & Credentials
  certificates: CertificateInfo[];
  addCertificate: (cert: Omit<CertificateInfo, 'id'>) => void;
  updateCertificate: (id: string, cert: Partial<CertificateInfo>) => void;
  deleteCertificate: (id: string) => void;

  // Personal Info & Brand Info
  personalInfo: typeof PERSONAL_INFO;
  updatePersonalInfo: (info: Partial<typeof PERSONAL_INFO>) => void;

  // Backup & Reset
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'yonas_portfolio_projects_v2',
  ASSETS: 'yonas_portfolio_assets_v2',
  BLOGS: 'yonas_portfolio_blogs_v2',
  CERTS: 'yonas_portfolio_certs_v2',
  INFO: 'yonas_portfolio_info_v2',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Determine initial subdomain from URL hash or query params
  const getInitialSubdomain = (): SubdomainType => {
    if (typeof window === 'undefined') return 'main';
    const hash = window.location.hash.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const subParam = params.get('sub') || params.get('subdomain');

    if (subParam === 'video' || hash === '#video' || hash === '#video-portfolio') {
      return 'video';
    }
    if (subParam === 'admin' || hash === '#admin' || hash === '#studio') {
      return 'admin';
    }
    return 'main';
  };

  const [subdomain, setSubdomainState] = useState<SubdomainType>(getInitialSubdomain);

  const setSubdomain = useCallback((sub: SubdomainType) => {
    setSubdomainState(sub);
    if (typeof window !== 'undefined') {
      if (sub === 'video') {
        window.history.pushState(null, '', '#video');
      } else if (sub === 'admin') {
        window.history.pushState(null, '', '#admin');
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#video' || hash === '#video-portfolio') {
        setSubdomainState('video');
      } else if (hash === '#admin' || hash === '#studio') {
        setSubdomainState('admin');
      } else if (!hash || hash === '#main' || hash === '#home') {
        setSubdomainState('main');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Projects state
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load projects from storage', e);
    }
    return PROJECTS_SHOWCASE;
  });

  // Assets state
  const [assets, setAssets] = useState<CreatorAsset[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ASSETS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load assets from storage', e);
    }
    return AUDIENCE_ASSETS;
  });

  // Blog posts state
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load blogs from storage', e);
    }
    return INITIAL_BLOG_POSTS;
  });

  // Certificates state
  const [certificates, setCertificates] = useState<CertificateInfo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load certificates from storage', e);
    }
    return CERTIFICATES_LIST;
  });

  // Personal Info state
  const [personalInfo, setPersonalInfo] = useState<typeof PERSONAL_INFO>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFO);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load personal info from storage', e);
    }
    return PERSONAL_INFO;
  });

  // Save to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(assets));
    } catch (e) {
      console.error(e);
    }
  }, [assets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
    } catch (e) {
      console.error(e);
    }
  }, [blogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CERTS, JSON.stringify(certificates));
    } catch (e) {
      console.error(e);
    }
  }, [certificates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(personalInfo));
    } catch (e) {
      console.error(e);
    }
  }, [personalInfo]);

  // Project Actions
  const addProject = useCallback((newProj: Omit<Project, 'id'>) => {
    const item: Project = {
      ...newProj,
      id: `proj-${Date.now()}`,
    };
    setProjects((prev) => [item, ...prev]);
  }, []);

  const updateProject = useCallback((id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleFeaturedProject = useCallback((id: string) => {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );
  }, []);

  // Asset Actions
  const addAsset = useCallback((newAsset: Omit<CreatorAsset, 'id'>) => {
    const item: CreatorAsset = {
      ...newAsset,
      id: `asset-${Date.now()}`,
    };
    setAssets((prev) => [item, ...prev]);
  }, []);

  const updateAsset = useCallback((id: string, updated: Partial<CreatorAsset>) => {
    setAssets((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  }, []);

  const deleteAsset = useCallback((id: string) => {
    setAssets((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Blog Actions
  const addBlog = useCallback((newBlog: Omit<BlogPost, 'id'>) => {
    const item: BlogPost = {
      ...newBlog,
      id: `blog-${Date.now()}`,
    };
    setBlogs((prev) => [item, ...prev]);
  }, []);

  const updateBlog = useCallback((id: string, updated: Partial<BlogPost>) => {
    setBlogs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  }, []);

  const deleteBlog = useCallback((id: string) => {
    setBlogs((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Certificate Actions
  const addCertificate = useCallback((newCert: Omit<CertificateInfo, 'id'>) => {
    const item: CertificateInfo = {
      ...newCert,
      id: `cert-${Date.now()}`,
    };
    setCertificates((prev) => [item, ...prev]);
  }, []);

  const updateCertificate = useCallback((id: string, updated: Partial<CertificateInfo>) => {
    setCertificates((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  }, []);

  const deleteCertificate = useCallback((id: string) => {
    setCertificates((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Personal Info Action
  const updatePersonalInfo = useCallback((updated: Partial<typeof PERSONAL_INFO>) => {
    setPersonalInfo((prev) => ({ ...prev, ...updated }));
  }, []);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setProjects(PROJECTS_SHOWCASE);
    setAssets(AUDIENCE_ASSETS);
    setBlogs(INITIAL_BLOG_POSTS);
    setCertificates(CERTIFICATES_LIST);
    setPersonalInfo(PERSONAL_INFO);
    try {
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
      localStorage.removeItem(STORAGE_KEYS.ASSETS);
      localStorage.removeItem(STORAGE_KEYS.BLOGS);
      localStorage.removeItem(STORAGE_KEYS.CERTS);
      localStorage.removeItem(STORAGE_KEYS.INFO);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Export JSON
  const exportDataJSON = useCallback(() => {
    const bundle = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      personalInfo,
      projects,
      assets,
      blogs,
      certificates,
    };
    return JSON.stringify(bundle, null, 2);
  }, [personalInfo, projects, assets, blogs, certificates]);

  // Import JSON
  const importDataJSON = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.projects && Array.isArray(parsed.projects)) {
        setProjects(parsed.projects);
      }
      if (parsed.assets && Array.isArray(parsed.assets)) {
        setAssets(parsed.assets);
      }
      if (parsed.blogs && Array.isArray(parsed.blogs)) {
        setBlogs(parsed.blogs);
      }
      if (parsed.certificates && Array.isArray(parsed.certificates)) {
        setCertificates(parsed.certificates);
      }
      if (parsed.personalInfo && typeof parsed.personalInfo === 'object') {
        setPersonalInfo(parsed.personalInfo);
      }
      return true;
    } catch (e) {
      console.error('Invalid JSON import', e);
      return false;
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        subdomain,
        setSubdomain,
        projects,
        addProject,
        updateProject,
        deleteProject,
        toggleFeaturedProject,
        assets,
        addAsset,
        updateAsset,
        deleteAsset,
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        certificates,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        personalInfo,
        updatePersonalInfo,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
