import React from 'react';
import {
  ArrowUp,
  Youtube,
  Instagram,
  Github,
  Mail,
  Heart,
  Dumbbell,
  Sparkles,
  Video,
  Lock,
  Download,
} from 'lucide-react';
import { SOCIAL_CHANNELS } from '../data/portfolioData';
import { useData } from '../context/DataContext';

export const Footer: React.FC = () => {
  const { personalInfo, setSubdomain } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white dark:bg-[#050a07] border-t border-neutral-200 dark:border-emerald-950 text-neutral-600 dark:text-neutral-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200 dark:border-emerald-950">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-black font-display font-black text-sm flex items-center justify-center shadow-sm">
                Y
              </span>
              <span className="font-display font-black text-2xl uppercase tracking-tight text-neutral-900 dark:text-white">
                {personalInfo.brandName}
              </span>
            </div>

            <p className="max-w-md text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
              Video Editor (CapCut, Premiere Pro, After Effects, Blender 3D), AI Developer, Marketer, and Content Creator. Crafting high-retention visuals and empowering creators with free assets.
            </p>

            {/* Social channels buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {SOCIAL_CHANNELS.map((ch, idx) => (
                <a
                  key={idx}
                  href={ch.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Visit ${ch.name} profile (${ch.audience})`}
                  className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-full bg-neutral-100 dark:bg-[#091710] border border-neutral-200 dark:border-emerald-950 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {ch.name} ({ch.audience})
                </a>
              ))}
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label={`Send email to ${personalInfo.email}`}
                className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-full bg-neutral-100 dark:bg-[#091710] border border-neutral-200 dark:border-emerald-950 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Email Me
              </a>
            </div>
          </div>

          {/* Quick Index Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Navigation
            </h4>
            <div className="flex flex-col gap-1.5 font-bold uppercase tracking-wider text-xs">
              <button
                type="button"
                onClick={() => scrollTo('home')}
                aria-label="Navigate to Top Reel section"
                className="text-left py-1.5 text-neutral-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Top / Reel
              </button>
              <button
                type="button"
                onClick={() => scrollTo('works')}
                aria-label="Navigate to Flagship Works section"
                className="text-left py-1.5 text-neutral-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Flagship Works & Cuts
              </button>
              <button
                type="button"
                onClick={() => scrollTo('assets')}
                aria-label="Navigate to Free Audience Vault section"
                className="text-left py-1.5 text-neutral-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Free Audience Vault
              </button>
              <button
                type="button"
                onClick={() => scrollTo('toolbox')}
                aria-label="Navigate to Toolkit and Certificate section"
                className="text-left py-1.5 text-neutral-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Toolkit & Certificate
              </button>
              <button
                type="button"
                onClick={() => scrollTo('community')}
                aria-label="Navigate to Discipline and Community section"
                className="text-left py-1.5 text-neutral-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Discipline & Community
              </button>
            </div>
          </div>

          {/* Subdomains & Creator Hub */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Creator Subdomains
            </h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSubdomain('video')}
                className="w-full text-left p-3 rounded-2xl bg-neutral-50 dark:bg-[#091710] border border-neutral-200 dark:border-emerald-950 hover:border-emerald-500/60 transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-500" />
                  <div>
                    <div className="font-bold text-xs text-neutral-900 dark:text-white font-mono">video.yonas.me</div>
                    <div className="text-[11px] text-neutral-500">Dedicated video portfolio & aspect filter</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  Subdomain
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('assets')}
                className="w-full text-left p-3 rounded-2xl bg-neutral-50 dark:bg-[#091710] border border-neutral-200 dark:border-emerald-950 hover:border-emerald-500/60 transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-500" />
                  <div>
                    <div className="font-bold text-xs text-neutral-900 dark:text-white font-mono">assets.yonas.me</div>
                    <div className="text-[11px] text-neutral-500">Free LUTs, SFX packs & Blender 3D rigs</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-emerald-950 text-neutral-800 dark:text-emerald-300">
                  Free Perks
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
          <div className="flex items-center gap-3">
            <p>
              © {new Date().getFullYear()} {personalInfo.name}. Obsessively crafted for creators and builders.
            </p>
            <span className="text-neutral-300 dark:text-neutral-800">·</span>
            {/* Private Admin link strictly for the owner */}
            <button
              type="button"
              onClick={() => setSubdomain('admin')}
              aria-label="Owner Admin Access"
              className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-neutral-400 hover:text-emerald-400" />
              <span>Owner Access</span>
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-[#091710] border border-neutral-200 dark:border-emerald-950 text-neutral-900 dark:text-white hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all font-bold text-xs uppercase tracking-wider cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
