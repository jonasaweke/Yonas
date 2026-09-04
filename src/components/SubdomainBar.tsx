import React from 'react';
import { Globe, Video, Lock, ShieldCheck, LogOut, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SubdomainType } from '../types';

export const SubdomainBar: React.FC = () => {
  const { subdomain, setSubdomain } = useData();

  // Publicly available subdomains for general audience
  const publicSubdomains: { id: SubdomainType; label: string; host: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'main',
      label: 'Main Brand Hub',
      host: 'main.yonas.me',
      icon: <Globe className="w-3.5 h-3.5" aria-hidden="true" />,
    },
    {
      id: 'video',
      label: 'Video Portfolio Subdomain',
      host: 'video.yonas.me',
      icon: <Video className="w-3.5 h-3.5" aria-hidden="true" />,
      badge: 'Dedicated Reel',
    },
  ];

  // If in Admin Console mode, display dedicated secure management header
  if (subdomain === 'admin') {
    return (
      <aside
        aria-label="Admin environment bar"
        className="bg-black text-white text-[11px] py-2 px-4 z-50 sticky top-0 border-b border-emerald-900/80 shadow-md"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span className="font-bold tracking-wider uppercase text-white">
              ADMIN CONSOLE:
            </span>
            <span className="text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              admin.yonas.me
            </span>
            <span className="hidden sm:inline text-neutral-400 text-[10px]">
              (Private Owner Session)
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSubdomain('main')}
            aria-label="Exit admin session to public website"
            className="min-h-[32px] px-3.5 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-emerald-900/60 text-neutral-200 hover:text-white font-bold text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <LogOut className="w-3 h-3 text-emerald-400" aria-hidden="true" />
            <span>Exit Admin</span>
          </button>
        </div>
      </aside>
    );
  }

  // Public View: Only main.yonas.me and video.yonas.me
  return (
    <aside
      aria-label="Subdomain environment switcher"
      className="bg-neutral-900/90 dark:bg-[#06120b]/95 border-b border-emerald-950/60 backdrop-blur-md text-white text-[11px] py-1.5 px-4 z-40 sticky top-0"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Domain Indicator */}
        <div className="flex items-center gap-2 text-emerald-400 font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-neutral-300">SUBDOMAIN:</span>
          <span className="font-bold text-emerald-300 underline underline-offset-2">
            {subdomain === 'video' ? 'video.yonas.me' : 'main.yonas.me'}
          </span>
        </div>

        {/* Right: Public Subdomain Switcher (Only Main & Video) */}
        <div className="flex items-center gap-1.5 bg-black/40 dark:bg-black/60 p-0.5 rounded-full border border-emerald-900/40">
          {publicSubdomains.map((tab) => {
            const isActive = subdomain === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSubdomain(tab.id)}
                aria-label={`Switch to ${tab.label} (${tab.host})`}
                aria-pressed={isActive}
                className={`min-h-[32px] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive
                    ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80 dark:hover:bg-emerald-950/40'
                }`}
              >
                {tab.icon}
                <span>{tab.host}</span>
                {tab.badge && !isActive && (
                  <span className="hidden md:inline px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[8px]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
