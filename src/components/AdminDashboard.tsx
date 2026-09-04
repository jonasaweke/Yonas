import React, { useState } from 'react';
import {
  Settings,
  Plus,
  Trash2,
  Edit2,
  Video,
  Download,
  BookOpen,
  Award,
  CheckCircle2,
  RotateCcw,
  Upload,
  ArrowRight,
  ExternalLink,
  Lock,
  Unlock,
  Sparkles,
  Globe,
  Sliders,
  Check,
  X,
  FileCode,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Project, CreatorAsset, BlogPost, CertificateInfo } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
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
  } = useData();

  // Authentication state (restricted to admin with persistent session)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('yonas_admin_auth') === 'true';
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Management Tab (videos, assets, certificates, dns, settings)
  const [activeTab, setActiveTab] = useState<
    'videos' | 'assets' | 'certificates' | 'settings' | 'dns'
  >('videos');

  // Modal / Form States
  const [editingVideo, setEditingVideo] = useState<Project | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const [editingAsset, setEditingAsset] = useState<CreatorAsset | null>(null);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const [editingCert, setEditingCert] = useState<CertificateInfo | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = enteredPin.trim();
    if (pin === '1234' || pin.toLowerCase() === 'yonas' || pin === 'admin2026') {
      sessionStorage.setItem('yonas_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Access denied. Invalid admin PIN.');
    }
  };

  // ----------------------------------------------------
  // VIDEO FORM HANDLER
  // ----------------------------------------------------
  const handleSaveVideo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const softwareStr = (formData.get('software') as string) || '';
    const detailsStr = (formData.get('details') as string) || '';

    const videoData = {
      title: formData.get('title') as string,
      category: formData.get('category') as any,
      aspectRatio: formData.get('aspectRatio') as '16:9' | '9:16',
      duration: (formData.get('duration') as string) || '0:45',
      tagline: formData.get('tagline') as string,
      description: formData.get('description') as string,
      thumbnailUrl:
        (formData.get('thumbnailUrl') as string) ||
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      software: softwareStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      details: detailsStr
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      featured: formData.get('featured') === 'on',
      stats: [
        {
          label: (formData.get('statLabel') as string) || 'Retention Rate',
          value: (formData.get('statValue') as string) || '88%',
        },
      ],
    };

    if (editingVideo) {
      updateProject(editingVideo.id, videoData);
      showNotification(`Updated video post: "${videoData.title}"`);
    } else {
      addProject(videoData);
      showNotification(`Published new video post: "${videoData.title}"`);
    }

    setIsVideoModalOpen(false);
    setEditingVideo(null);
  };

  // ----------------------------------------------------
  // ASSET FORM HANDLER
  // ----------------------------------------------------
  const handleSaveAsset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tagsStr = (formData.get('tags') as string) || '';

    const assetData = {
      title: formData.get('title') as string,
      category: formData.get('category') as any,
      fileFormat: formData.get('fileFormat') as string,
      fileSize: formData.get('fileSize') as string,
      downloadCount: (formData.get('downloadCount') as string) || '0',
      badge: (formData.get('badge') as string) || 'Free Asset',
      description: formData.get('description') as string,
      tags: tagsStr
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (editingAsset) {
      updateAsset(editingAsset.id, assetData);
      showNotification(`Updated audience asset: "${assetData.title}"`);
    } else {
      addAsset(assetData);
      showNotification(`Added new audience asset: "${assetData.title}"`);
    }

    setIsAssetModalOpen(false);
    setEditingAsset(null);
  };

  // ----------------------------------------------------
  // BLOG FORM HANDLER
  // ----------------------------------------------------
  const handleSaveBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tagsStr = (formData.get('tags') as string) || '';

    const blogData = {
      title: formData.get('title') as string,
      category: formData.get('category') as any,
      readTime: (formData.get('readTime') as string) || '4 min read',
      date: (formData.get('date') as string) || 'Today',
      coverImage:
        (formData.get('coverImage') as string) ||
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      tags: tagsStr
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      published: formData.get('published') === 'on',
    };

    if (editingBlog) {
      updateBlog(editingBlog.id, blogData);
      showNotification(`Updated blog post: "${blogData.title}"`);
    } else {
      addBlog(blogData);
      showNotification(`Created new blog post: "${blogData.title}"`);
    }

    setIsBlogModalOpen(false);
    setEditingBlog(null);
  };

  // ----------------------------------------------------
  // CERTIFICATE FORM HANDLER
  // ----------------------------------------------------
  const handleSaveCert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skillsStr = (formData.get('skills') as string) || '';

    const certData = {
      name: formData.get('name') as string,
      issuer: formData.get('issuer') as string,
      issueDate: formData.get('issueDate') as string,
      credentialId: formData.get('credentialId') as string,
      credentialUrl: (formData.get('credentialUrl') as string) || '',
      description: formData.get('description') as string,
      skills: skillsStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      verified: formData.get('verified') === 'on',
    };

    if (editingCert) {
      updateCertificate(editingCert.id, certData);
      showNotification(`Updated certificate: "${certData.name}"`);
    } else {
      addCertificate(certData);
      showNotification(`Added new certificate: "${certData.name}"`);
    }

    setIsCertModalOpen(false);
    setEditingCert(null);
  };

  // Export and Import JSON helpers
  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yonas-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showNotification('Backup exported successfully');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importDataJSON(content)) {
        showNotification('Data imported successfully!');
      } else {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  // If locked, render authentication screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050a07] text-[#f2f7f4] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#09150e] border border-emerald-900 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" aria-hidden="true" />
            </div>
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white">
              RESTRICTED ADMIN ACCESS
            </h1>
            <p className="text-xs text-neutral-400 font-mono">
              admin.yonas.me · Authorized Owner Only
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-pin" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Admin Security PIN
              </label>
              <input
                id="admin-pin"
                type="password"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="Enter PIN..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white font-mono text-center tracking-widest text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              />
              {authError && <p className="text-xs text-red-400 mt-1.5 font-medium">{authError}</p>}
            </div>

            <button
              type="submit"
              className="min-h-[44px] w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Verify & Enter
            </button>
          </form>

          <div className="pt-4 border-t border-emerald-950/60 text-center">
            <button
              type="button"
              onClick={() => setSubdomain('main')}
              className="text-xs text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              ← Return to Public Portfolio (main.yonas.me)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a07] text-[#f2f7f4] selection:bg-emerald-500 selection:text-black">
      {/* Toast Notification */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2 animate-in slide-in-from-bottom"
        >
          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="border-b border-emerald-950 bg-[#07140d]/90 px-4 sm:px-8 py-4 backdrop-blur-md sticky top-10 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-black flex items-center justify-center font-black font-display text-lg shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              Y
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-xl text-white uppercase tracking-tight">
                  ADMIN STUDIO & CMS
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  LIVE CONTROLLER
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Host: admin.yonas.me · Controlling All Stuff
              </p>
            </div>
          </div>

          {/* Quick Subdomain Links & Data Tools */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSubdomain('video')}
              aria-label="View dedicated video portfolio subdomain"
              className="min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#0d2217] border border-emerald-900 text-emerald-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Video className="w-3.5 h-3.5" aria-hidden="true" />
              <span>video.yonas.me</span>
            </button>

            <button
              type="button"
              onClick={() => setSubdomain('main')}
              aria-label="View main portfolio site"
              className="min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#0d2217] border border-emerald-900 text-emerald-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>main.yonas.me</span>
            </button>

            <button
              type="button"
              onClick={handleExport}
              aria-label="Export portfolio backup as JSON"
              className="min-h-[40px] px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-emerald-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <label
              className="min-h-[40px] px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-emerald-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer focus-within:ring-2 focus-within:ring-emerald-400"
              title="Import JSON Backup"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Restore</span>
              <input type="file" accept=".json" onChange={handleImport} className="sr-only" />
            </label>

            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('yonas_admin_auth');
                setIsAuthenticated(false);
                setEnteredPin('');
              }}
              aria-label="Lock admin session"
              className="min-h-[40px] px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-900/60 hover:border-red-500 text-red-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <Lock className="w-3.5 h-3.5 text-red-400" aria-hidden="true" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Counters Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => setActiveTab('videos')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-[#0f281b] border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-[#08150e] border-emerald-950 hover:border-emerald-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Video Posts Place</span>
              <Video className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-white mt-2">
              {projects.length}
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Manage & Add Videos →</span>
          </div>

          <div
            onClick={() => setActiveTab('assets')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer ${
              activeTab === 'assets'
                ? 'bg-[#0f281b] border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-[#08150e] border-emerald-950 hover:border-emerald-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Audience Assets</span>
              <Download className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-white mt-2">
              {assets.length}
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Manage & Add Assets →</span>
          </div>

          <div
            onClick={() => setActiveTab('certificates')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-[#0f281b] border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-[#08150e] border-emerald-950 hover:border-emerald-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Certificates</span>
              <Award className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-white mt-2">
              {certificates.length}
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Manage Certificates →</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-emerald-950/80 pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeTab === 'videos'
                ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-[#08150e] text-neutral-400 hover:text-white border border-emerald-950'
            }`}
          >
            <Video className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Video Posts Place</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('assets')}
            className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeTab === 'assets'
                ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-[#08150e] text-neutral-400 hover:text-white border border-emerald-950'
            }`}
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Audience Assets Vault</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('certificates')}
            className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeTab === 'certificates'
                ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-[#08150e] text-neutral-400 hover:text-white border border-emerald-950'
            }`}
          >
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            <span>New Certificate Post</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dns')}
            className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeTab === 'dns'
                ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-[#08150e] text-neutral-400 hover:text-white border border-emerald-950'
            }`}
          >
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Subdomains & DNS Guide</span>
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: VIDEO POSTS PLACE                             */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'videos' && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Video Posts & Cuts Management
                </h2>
                <p className="text-xs text-neutral-400">
                  Add new video projects, configure software tags (CapCut, Premiere Pro, AE, Blender), aspect ratios, and highlights.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingVideo(null);
                  setIsVideoModalOpen(true);
                }}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add New Video Post</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl bg-[#09160f] border border-emerald-950 p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-emerald-400 text-[10px] font-mono font-bold">
                        {project.aspectRatio} · {project.duration || '0:45'}
                      </span>
                      {project.featured && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold">
                          Featured
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {project.software.map((sw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full bg-emerald-950 text-[10px] text-emerald-300 font-bold"
                          >
                            {sw}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-display font-black text-lg text-white">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-950 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleFeaturedProject(project.id)}
                      className="text-[11px] font-mono text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {project.featured ? '★ Starred' : '☆ Make Featured'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingVideo(project);
                          setIsVideoModalOpen(true);
                        }}
                        aria-label={`Edit video post ${project.title}`}
                        className="min-h-[36px] min-w-[36px] p-2 rounded-xl bg-neutral-900 border border-emerald-950 hover:border-emerald-500 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete video post "${project.title}"?`)) {
                            deleteProject(project.id);
                            showNotification(`Deleted "${project.title}"`);
                          }
                        }}
                        aria-label={`Delete video post ${project.title}`}
                        className="min-h-[36px] min-w-[36px] p-2 rounded-xl bg-neutral-900 border border-emerald-950 hover:border-red-500 text-neutral-300 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: AUDIENCE ASSETS PLACE                         */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'assets' && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Audience Assets Vault Management
                </h2>
                <p className="text-xs text-neutral-400">
                  Publish free presets, LUTs, Blender 3D rigs, sound effects, and thumbnail packs for your creator audience.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingAsset(null);
                  setIsAssetModalOpen(true);
                }}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add New Creator Asset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded-3xl bg-[#09160f] border border-emerald-950 p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-[10px] font-bold text-emerald-300 uppercase">
                        {asset.category}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        {asset.fileFormat} · {asset.fileSize}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-xl text-white">
                      {asset.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {asset.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {asset.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] text-neutral-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-emerald-950 flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {asset.downloadCount} Downloads
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAsset(asset);
                          setIsAssetModalOpen(true);
                        }}
                        aria-label={`Edit asset ${asset.title}`}
                        className="min-h-[36px] min-w-[36px] p-2 rounded-xl bg-neutral-900 border border-emerald-950 hover:border-emerald-500 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete asset "${asset.title}"?`)) {
                            deleteAsset(asset.id);
                            showNotification(`Deleted "${asset.title}"`);
                          }
                        }}
                        aria-label={`Delete asset ${asset.title}`}
                        className="min-h-[36px] min-w-[36px] p-2 rounded-xl bg-neutral-900 border border-emerald-950 hover:border-red-500 text-neutral-300 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: NEW CERTIFICATE POST PLACE                    */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'certificates' && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Certificates & Credentials Management
                </h2>
                <p className="text-xs text-neutral-400">
                  Manage your verified programming certificate, AI accreditations, and video editing credentials.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingCert(null);
                  setIsCertModalOpen(true);
                }}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add New Certificate Post</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-3xl bg-[#09160f] border border-emerald-950 p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          {cert.credentialId}
                        </span>
                      </div>
                      {cert.verified ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-400 text-[10px] font-bold">
                          Pending
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-black text-xl text-white">
                      {cert.name}
                    </h3>
                    <div className="text-xs text-neutral-400 font-mono">
                      Issued by {cert.issuer} · {cert.issueDate}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {cert.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-900 text-[10px] font-mono text-emerald-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-emerald-950 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCert(cert);
                        setIsCertModalOpen(true);
                      }}
                      aria-label={`Edit certificate ${cert.name}`}
                      className="min-h-[36px] px-4 py-1.5 rounded-xl bg-neutral-900 border border-emerald-950 hover:border-emerald-500 text-neutral-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete certificate "${cert.name}"?`)) {
                          deleteCertificate(cert.id);
                          showNotification(`Deleted "${cert.name}"`);
                        }
                      }}
                      aria-label={`Delete certificate ${cert.name}`}
                      className="min-h-[36px] p-2 rounded-xl bg-neutral-900 border border-emerald-950 hover:border-red-500 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 5: SUBDOMAINS & DNS SETUP GUIDE                  */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'dns' && (
          <section className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#09160f] border border-emerald-950 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>SUBDOMAIN ARCHITECTURE SPECIFICATION</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                HOW YOUR REAL SUBDOMAINS ARE CONFIGURED
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
                This website includes active simulated subdomain routing inside the browser (via <code className="text-emerald-400 font-mono">video.yonas.me</code>, <code className="text-emerald-400 font-mono">admin.yonas.me</code>, and hash routes <code className="text-emerald-400 font-mono">#video</code> & <code className="text-emerald-400 font-mono">#admin</code>). When you bind your own custom domain (e.g. <code className="text-emerald-400 font-mono">yonas.me</code> or <code className="text-emerald-400 font-mono">yonascreatives.com</code>), configure these DNS records in your domain registrar:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-[#050d08] border border-emerald-950 space-y-2">
                  <div className="font-mono text-xs text-emerald-400 font-bold uppercase">Subdomain 1 (Main)</div>
                  <div className="text-sm font-bold text-white">@ or www.yourdomain.com</div>
                  <div className="text-xs text-neutral-400 font-mono">CNAME / A → Target Cloud Host</div>
                  <p className="text-xs text-neutral-300">
                    Loads the flagship multi-disciplinary portfolio with the full reel, asset vault, credentials, and contact hub.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#050d08] border border-emerald-950 space-y-2">
                  <div className="font-mono text-xs text-emerald-400 font-bold uppercase">Subdomain 2 (Video)</div>
                  <div className="text-sm font-bold text-white">video.yourdomain.com</div>
                  <div className="text-xs text-neutral-400 font-mono">CNAME → yourdomain.com</div>
                  <p className="text-xs text-neutral-300">
                    Directly loads the dedicated Video Portfolio view mode focusing 100% on Premiere Pro, CapCut, AE, and Blender cuts!
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#050d08] border border-emerald-950 space-y-2">
                  <div className="font-mono text-xs text-emerald-400 font-bold uppercase">Subdomain 3 (Admin)</div>
                  <div className="text-sm font-bold text-white">admin.yourdomain.com</div>
                  <div className="text-xs text-neutral-400 font-mono">CNAME → yourdomain.com</div>
                  <p className="text-xs text-neutral-300">
                    Loads this Creator Studio CMS where you can publish new video cuts, assets, blogs, and certificates.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-950 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">
                  Data is persistently saved in browser localStorage with instant JSON export & backup.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all site data to original defaults? Any custom posts will be cleared.')) {
                      resetToDefaults();
                      showNotification('Site data restored to original template.');
                    }
                  }}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-neutral-900 border border-red-900/40 text-red-400 hover:bg-red-950/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset All Data to Defaults</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ---------------------------------------------------- */}
      {/* MODAL 1: NEW / EDIT VIDEO POST                       */}
      {/* ---------------------------------------------------- */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-form-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#08150e] border border-emerald-800 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setIsVideoModalOpen(false);
                setEditingVideo(null);
              }}
              aria-label="Close video post form"
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-emerald-900 text-white hover:opacity-75 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <h3 id="video-form-title" className="font-display font-black text-2xl text-white uppercase">
              {editingVideo ? 'Edit Video Post' : 'Add New Video Post'}
            </h3>

            <form onSubmit={handleSaveVideo} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Video Title *
                </label>
                <input
                  name="title"
                  defaultValue={editingVideo?.title || ''}
                  required
                  placeholder="e.g., Cyberpunk 60 FPS Kinetic Showreel"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editingVideo?.category || 'Video Editing'}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <option value="Video Editing">Video Editing</option>
                    <option value="3D & Motion">3D & Motion</option>
                    <option value="Thumbnails & Graphics">Thumbnails & Graphics</option>
                    <option value="AI & Tools">AI & Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    name="aspectRatio"
                    defaultValue={editingVideo?.aspectRatio || '16:9'}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <option value="16:9">16:9 (YouTube/Cinematic)</option>
                    <option value="9:16">9:16 (Shorts/TikTok/Reels)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Duration
                  </label>
                  <input
                    name="duration"
                    defaultValue={editingVideo?.duration || '0:45'}
                    placeholder="e.g. 0:45, 1:12"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Software Used (comma separated) *
                </label>
                <input
                  name="software"
                  defaultValue={editingVideo?.software.join(', ') || 'Premiere Pro, After Effects, CapCut, Blender'}
                  required
                  placeholder="Premiere Pro, After Effects, CapCut, Blender"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Thumbnail Image URL *
                </label>
                <input
                  name="thumbnailUrl"
                  defaultValue={editingVideo?.thumbnailUrl || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80'}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  name="tagline"
                  defaultValue={editingVideo?.tagline || ''}
                  placeholder="e.g., High-velocity 60 FPS edit featuring custom 3D passes"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Full Video Description *
                </label>
                <textarea
                  name="description"
                  defaultValue={editingVideo?.description || ''}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Timeline Architecture Breakdown (1 per line)
                </label>
                <textarea
                  name="details"
                  defaultValue={editingVideo?.details.join('\n') || 'Custom glitch transitions engineered in After Effects\nOriginal 3D neon assets modeled and rendered in Blender\nDynamic audio mix combining bass risers, whooshes, and impact hits'}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Highlight Metric Label
                  </label>
                  <input
                    name="statLabel"
                    defaultValue={editingVideo?.stats?.[0]?.label || 'Retention Rate'}
                    className="w-full px-4 py-2 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Highlight Metric Value
                  </label>
                  <input
                    name="statValue"
                    defaultValue={editingVideo?.stats?.[0]?.value || '88%'}
                    className="w-full px-4 py-2 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="featured-check"
                  type="checkbox"
                  name="featured"
                  defaultChecked={editingVideo ? editingVideo.featured : true}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400"
                />
                <label htmlFor="featured-check" className="text-xs text-neutral-300">
                  Feature in Top Reel on Video Portfolio Subdomain
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setEditingVideo(null);
                  }}
                  className="min-h-[44px] px-5 py-2 rounded-full bg-neutral-900 text-neutral-300 text-xs font-bold uppercase hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-7 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  Save Video Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 2: NEW / EDIT CREATOR ASSET                    */}
      {/* ---------------------------------------------------- */}
      {isAssetModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="asset-form-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative w-full max-w-xl rounded-3xl bg-[#08150e] border border-emerald-800 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setIsAssetModalOpen(false);
                setEditingAsset(null);
              }}
              aria-label="Close asset form"
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-emerald-900 text-white hover:opacity-75 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <h3 id="asset-form-title" className="font-display font-black text-2xl text-white uppercase">
              {editingAsset ? 'Edit Creator Asset' : 'Add New Audience Asset'}
            </h3>

            <form onSubmit={handleSaveAsset} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Asset Title *
                </label>
                <input
                  name="title"
                  defaultValue={editingAsset?.title || ''}
                  required
                  placeholder="e.g. Cinematic Film Emulation LUTs Pack"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editingAsset?.category || 'LUTs & Color'}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 focus:border-emerald-500 text-white text-xs"
                  >
                    <option value="LUTs & Color">LUTs & Color</option>
                    <option value="Sound FX">Sound FX</option>
                    <option value="3D Assets">3D Assets</option>
                    <option value="PSD Templates">PSD Templates</option>
                    <option value="AI Workflows">AI Workflows</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Badge Label
                  </label>
                  <input
                    name="badge"
                    defaultValue={editingAsset?.badge || 'Most Popular'}
                    placeholder="e.g., Essential, VIP, Free"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    File Format
                  </label>
                  <input
                    name="fileFormat"
                    defaultValue={editingAsset?.fileFormat || '.CUBE (10 Presets)'}
                    required
                    placeholder=".CUBE, .WAV, .BLEND"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    File Size
                  </label>
                  <input
                    name="fileSize"
                    defaultValue={editingAsset?.fileSize || '45 MB'}
                    required
                    placeholder="e.g. 45 MB, 120 MB"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Download Count
                  </label>
                  <input
                    name="downloadCount"
                    defaultValue={editingAsset?.downloadCount || '2.4K'}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  name="tags"
                  defaultValue={editingAsset?.tags.join(', ') || 'CapCut, Premiere Pro, Color Grading'}
                  placeholder="CapCut, Premiere Pro, 4K, Free"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  defaultValue={editingAsset?.description || ''}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAssetModalOpen(false);
                    setEditingAsset(null);
                  }}
                  className="min-h-[44px] px-5 py-2 rounded-full bg-neutral-900 text-neutral-300 text-xs font-bold uppercase hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-7 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  Save Asset Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 3: NEW / EDIT BLOG POST                        */}
      {/* ---------------------------------------------------- */}
      {isBlogModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-form-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#08150e] border border-emerald-800 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setIsBlogModalOpen(false);
                setEditingBlog(null);
              }}
              aria-label="Close blog form"
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-emerald-900 text-white hover:opacity-75 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <h3 id="blog-form-title" className="font-display font-black text-2xl text-white uppercase">
              {editingBlog ? 'Edit Blog Post' : 'Write New Blog / Case Study'}
            </h3>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Article Title *
                </label>
                <input
                  name="title"
                  defaultValue={editingBlog?.title || ''}
                  required
                  placeholder="e.g. The 1.8-Second Rule: Engineering Viral Retention"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editingBlog?.category || 'Video Editing'}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  >
                    <option value="Video Editing">Video Editing</option>
                    <option value="AI & Tools">AI & Tools</option>
                    <option value="3D & VFX">3D & VFX</option>
                    <option value="Growth & Marketing">Growth & Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Read Time
                  </label>
                  <input
                    name="readTime"
                    defaultValue={editingBlog?.readTime || '4 min read'}
                    placeholder="e.g. 5 min read"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Publish Date
                  </label>
                  <input
                    name="date"
                    defaultValue={editingBlog?.date || 'Sep 2026'}
                    placeholder="e.g. Sep 2026"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Cover Image URL
                </label>
                <input
                  name="coverImage"
                  defaultValue={editingBlog?.coverImage || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80'}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Short Excerpt / Preview Summary *
                </label>
                <textarea
                  name="excerpt"
                  defaultValue={editingBlog?.excerpt || ''}
                  required
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Full Article Content (Markdown format supported) *
                </label>
                <textarea
                  name="content"
                  defaultValue={editingBlog?.content || ''}
                  required
                  rows={7}
                  placeholder="Write your in-depth case study, key takeaways, and editing breakdowns..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  name="tags"
                  defaultValue={editingBlog?.tags.join(', ') || 'Video, Pacing, Retention, CapCut'}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="published-check"
                  type="checkbox"
                  name="published"
                  defaultChecked={editingBlog ? editingBlog.published : true}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400"
                />
                <label htmlFor="published-check" className="text-xs text-neutral-300">
                  Publish immediately to Creator Logs section on main site
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsBlogModalOpen(false);
                    setEditingBlog(null);
                  }}
                  className="min-h-[44px] px-5 py-2 rounded-full bg-neutral-900 text-neutral-300 text-xs font-bold uppercase hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-7 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  Save Blog Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 4: NEW / EDIT CERTIFICATE                      */}
      {/* ---------------------------------------------------- */}
      {isCertModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-form-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative w-full max-w-xl rounded-3xl bg-[#08150e] border border-emerald-800 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setIsCertModalOpen(false);
                setEditingCert(null);
              }}
              aria-label="Close certificate form"
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-emerald-900 text-white hover:opacity-75 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <h3 id="cert-form-title" className="font-display font-black text-2xl text-white uppercase">
              {editingCert ? 'Edit Certificate Post' : 'Add New Certificate Post'}
            </h3>

            <form onSubmit={handleSaveCert} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Certificate Name *
                </label>
                <input
                  name="name"
                  defaultValue={editingCert?.name || ''}
                  required
                  placeholder="e.g. Certified Software Programming & AI Systems"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Issuing Organization *
                  </label>
                  <input
                    name="issuer"
                    defaultValue={editingCert?.issuer || 'Global Tech Accreditation Institute'}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Issue Date *
                  </label>
                  <input
                    name="issueDate"
                    defaultValue={editingCert?.issueDate || 'Verified 2025'}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Credential ID *
                  </label>
                  <input
                    name="credentialId"
                    defaultValue={editingCert?.credentialId || 'CERT-YN-9842'}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                    Verification URL (optional)
                  </label>
                  <input
                    name="credentialUrl"
                    defaultValue={editingCert?.credentialUrl || ''}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Skills Validated (comma separated) *
                </label>
                <input
                  name="skills"
                  defaultValue={editingCert?.skills.join(', ') || 'Python, TypeScript, AI Automation, Web Architecture'}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  defaultValue={editingCert?.description || ''}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-950 text-white text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="verified-check"
                  type="checkbox"
                  name="verified"
                  defaultChecked={editingCert ? editingCert.verified : true}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400"
                />
                <label htmlFor="verified-check" className="text-xs text-neutral-300">
                  Mark as officially verified credential
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCertModalOpen(false);
                    setEditingCert(null);
                  }}
                  className="min-h-[44px] px-5 py-2 rounded-full bg-neutral-900 text-neutral-300 text-xs font-bold uppercase hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-7 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
