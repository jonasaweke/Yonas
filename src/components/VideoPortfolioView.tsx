import React, { useState, useEffect } from 'react';
import {
  Play,
  Film,
  Sparkles,
  Layers,
  Clock,
  Flame,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  X,
  SlidersHorizontal,
  ChevronRight,
  Video,
  MonitorPlay,
  Smartphone,
  Check,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Project } from '../types';

export const VideoPortfolioView: React.FC = () => {
  const { projects, setSubdomain, personalInfo } = useData();

  // Filters
  const [ratioFilter, setRatioFilter] = useState<'All' | '16:9' | '9:16'>('All');
  const [softwareFilter, setSoftwareFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    if (activeProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeProject]);

  // Video-relevant projects (Video Editing or 3D & Motion)
  const videoProjects = projects.filter(
    (p) => p.category === 'Video Editing' || p.category === '3D & Motion'
  );

  const filteredProjects = videoProjects.filter((p) => {
    const matchRatio = ratioFilter === 'All' || p.aspectRatio === ratioFilter;
    const matchSoftware =
      softwareFilter === 'All' ||
      p.software.some((s) => s.toLowerCase().includes(softwareFilter.toLowerCase()));
    return matchRatio && matchSoftware;
  });

  const softwares = ['All', 'Premiere Pro', 'After Effects', 'CapCut', 'Blender'];

  return (
    <div className="min-h-screen bg-[#050a07] text-[#f2f7f4] selection:bg-emerald-500 selection:text-black">
      {/* Subdomain Header Banner */}
      <div className="border-b border-emerald-950/80 bg-[#08150e]/90 px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold tracking-widest uppercase">
                SUBDOMAIN: video.yonas.me
              </span>
              <span className="text-xs text-neutral-400 font-mono">DEDICATED SHOWCASE</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
              VIDEO EDITING & 3D MOTION VAULT
            </h1>
            <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
              High-velocity cuts, algorithmic viewer retention, and 3D visual effects crafted with{' '}
              <span className="text-emerald-400 font-semibold">Adobe Premiere Pro, After Effects, CapCut Pro, and Blender</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSubdomain('main')}
              aria-label="Return to main multi-disciplinary portfolio"
              className="min-h-[44px] px-5 py-2.5 rounded-full bg-neutral-900 border border-emerald-900/60 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>Explore Main Hub</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            </button>
            <a
              href="#video-inquiry"
              aria-label="Book video editing services"
              className="min-h-[44px] inline-flex items-center px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Book Video Edit
            </a>
          </div>
        </div>
      </div>

      {/* Editing Metrics Strip */}
      <div className="border-b border-emerald-950/60 bg-[#06100a]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="border-r border-emerald-950/50 pr-2">
            <div className="font-display font-black text-2xl sm:text-3xl text-emerald-400">88%+</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Avg. Retention Peak</div>
          </div>
          <div className="border-r border-emerald-950/50 pr-2">
            <div className="font-display font-black text-2xl sm:text-3xl text-emerald-400">1.8s</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Cadence Cut Pacing</div>
          </div>
          <div className="border-r border-emerald-950/50 pr-2">
            <div className="font-display font-black text-2xl sm:text-3xl text-emerald-400">60 FPS</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Master Render Export</div>
          </div>
          <div>
            <div className="font-display font-black text-2xl sm:text-3xl text-emerald-400">450K+</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Organic Video Views</div>
          </div>
        </div>
      </div>

      {/* Main Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-3xl bg-[#0a1710] border border-emerald-950">
          {/* Ratio Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>Aspect Ratio:</span>
            </span>
            {(['All', '16:9', '9:16'] as const).map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => setRatioFilter(ratio)}
                aria-pressed={ratioFilter === ratio}
                aria-label={`Filter by aspect ratio: ${ratio}`}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  ratioFilter === ratio
                    ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'bg-[#0e2217] text-neutral-300 hover:text-white border border-emerald-900/50'
                }`}
              >
                {ratio === '16:9' ? (
                  <MonitorPlay className="w-3.5 h-3.5" aria-hidden="true" />
                ) : ratio === '9:16' ? (
                  <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Film className="w-3.5 h-3.5" aria-hidden="true" />
                )}
                <span>{ratio === 'All' ? 'All Cuts' : ratio === '16:9' ? '16:9 YouTube' : '9:16 Shorts'}</span>
              </button>
            ))}
          </div>

          {/* Software Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mr-1">
              Software:
            </span>
            {softwares.map((sw) => (
              <button
                key={sw}
                type="button"
                onClick={() => setSoftwareFilter(sw)}
                aria-pressed={softwareFilter === sw}
                aria-label={`Filter by software: ${sw}`}
                className={`min-h-[40px] px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  softwareFilter === sw
                    ? 'bg-white text-black font-extrabold'
                    : 'bg-[#07130c] text-neutral-400 hover:text-white border border-emerald-950'
                }`}
              >
                {sw}
              </button>
            ))}
          </div>
        </div>

        {/* Video Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-[#09150e] border border-emerald-950 hover:border-emerald-500/60 transition-all overflow-hidden flex flex-col justify-between shadow-lg"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09150e] via-transparent to-black/40" />

                {/* Aspect ratio badge & duration */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-800/60 font-mono text-[10px] font-bold">
                    {project.aspectRatio}
                  </span>
                  {project.duration && (
                    <span className="px-2 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-mono text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                      <span>{project.duration}</span>
                    </span>
                  )}
                </div>

                {/* Play Button Overlay */}
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  aria-label={`Open video player and breakdown for ${project.title}`}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)] transform transition-transform group-hover:scale-110 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Play className="w-6 h-6 fill-black ml-0.5" aria-hidden="true" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.software.map((sw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-900/50 text-[10px] font-bold text-emerald-300 uppercase tracking-wider"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display font-black text-xl text-white group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Stats & Trigger */}
                <div className="pt-4 border-t border-emerald-950 flex items-center justify-between">
                  {project.stats && project.stats[0] ? (
                    <div className="text-xs font-mono text-neutral-400">
                      <span className="text-emerald-400 font-bold">{project.stats[0].value}</span>{' '}
                      <span className="text-[10px] uppercase">{project.stats[0].label}</span>
                    </div>
                  ) : (
                    <span className="text-[11px] font-mono text-emerald-500 font-bold">100% Retentive</span>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    aria-label={`View full breakdown for ${project.title}`}
                    className="min-h-[44px] px-4 py-2 rounded-full bg-[#0d2116] hover:bg-emerald-500 hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <span>Inspect Cut</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Editing Process Architecture */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#09160f] border border-emerald-950 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>OBSESSIVE EDITING METHODOLOGY</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                HOW I CONSTRUCT VIRAL VIDEO TIMELINES
              </h2>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
              Standard Turnaround: 24-48 hrs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#050c07] border border-emerald-950 space-y-2">
              <div className="text-emerald-400 font-mono font-black text-lg">01 / PACING</div>
              <h4 className="text-sm font-bold text-white">Audio & Cadence Truncation</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Automated script cuts dead air &lt;150ms. Rhythmic sound bed synchronization on key thematic beats.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#050c07] border border-emerald-950 space-y-2">
              <div className="text-emerald-400 font-mono font-black text-lg">02 / VISUALS</div>
              <h4 className="text-sm font-bold text-white">Kinetic Subtitles & Pop-outs</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Custom font sizing, word-by-word active glow, and directional motion bursts designed in After Effects.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#050c07] border border-emerald-950 space-y-2">
              <div className="text-emerald-400 font-mono font-black text-lg">03 / 3D VFX</div>
              <h4 className="text-sm font-bold text-white">Blender 3D Asset Reveals</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Procedural product lighting, kinetic device models, and depth-mapped camera moves.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#050c07] border border-emerald-950 space-y-2">
              <div className="text-emerald-400 font-mono font-black text-lg">04 / COLOR</div>
              <h4 className="text-sm font-bold text-white">ACES Color & Sub Bass Foley</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Moody shadows with calibrated skin tones, paired with punchy sub-drops and tactile tactile whooshes.
              </p>
            </div>
          </div>
        </div>

        {/* Video Inquiry & Booking Callout */}
        <div
          id="video-inquiry"
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0a1c12] to-[#06100a] border border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              READY TO LEVEL UP YOUR VIEWS?
            </span>
            <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
              LET'S EDIT YOUR NEXT VIRAL VIDEO
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Accepting select YouTube creators, TikTok channels, and brands for high-retention video edits and 3D product animations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSubdomain('main');
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              aria-label="Send direct message via contact form"
              className="min-h-[48px] px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Start Project Inquiry
            </button>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label={`Email Yonas directly at ${personalInfo.email}`}
              className="min-h-[48px] inline-flex items-center px-6 py-3 rounded-full bg-neutral-900 border border-emerald-900/60 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* Video Breakdown Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#091710] border border-emerald-800 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label="Close video player modal"
              className="absolute top-5 right-5 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full bg-neutral-900 border border-emerald-900 text-white hover:opacity-75 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Simulated Video Frame */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-emerald-950 shadow-inner">
              <img
                src={activeProject.thumbnailUrl}
                alt={activeProject.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center p-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.6)] mb-3">
                  <Play className="w-7 h-7 fill-black ml-1" aria-hidden="true" />
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">
                  Timeline Master Preview
                </div>
                <div className="text-xs text-emerald-400 font-mono mt-1">
                  Aspect Ratio: {activeProject.aspectRatio} · Length: {activeProject.duration || '0:45'}
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {activeProject.software.map((sw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-xs font-bold text-emerald-300"
                  >
                    {sw}
                  </span>
                ))}
              </div>
              <h3 id="video-modal-title" className="font-display font-black text-2xl text-white uppercase">
                {activeProject.title}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Keyframe Details */}
            <div className="space-y-2 pt-2 border-t border-emerald-950">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Timeline Architecture Breakdown
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {activeProject.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-neutral-900 border border-emerald-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
