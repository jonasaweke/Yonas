import React, { useState } from 'react';
import {
  Play,
  Sparkles,
  ArrowRight,
  Download,
  Film,
  Box,
  Layers,
  Code2,
  CheckCircle2,
  Volume2,
  VolumeX,
  Video,
} from 'lucide-react';
import { SOCIAL_CHANNELS } from '../data/portfolioData';
import { useData } from '../context/DataContext';

export const HeroSection: React.FC = () => {
  const { personalInfo, setSubdomain } = useData();
  const [isPlayingTeaser, setIsPlayingTeaser] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden bg-white dark:bg-[#050a07] border-b border-neutral-200 dark:border-emerald-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Status Pill */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500 text-black font-bold text-[10px] uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span>Available for Select Edits & AI Builds</span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {personalInfo.location}
          </span>
        </div>

        {/* Hero Title & Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Bold Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] text-neutral-900 dark:text-white">
              OBSESSIVE <br />
              <span className="text-emerald-500 hover:text-emerald-400 transition-colors">
                EDITS.
              </span>{' '}
              <br />
              SMART AI.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
              Hey, I'm <strong className="text-neutral-900 dark:text-white font-bold">{personalInfo.name}</strong>. {personalInfo.tagline}
            </p>

            {/* Software & Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-1" aria-label="Core Creative Toolkit">
              {[
                'Premiere Pro & CapCut',
                'After Effects & Blender 3D',
                'Photoshop Graphics',
                'AI Tools & Python',
              ].map((name, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-[#091710] border border-neutral-200 dark:border-emerald-950 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-emerald-300"
                >
                  {name}
                </span>
              ))}
            </div>

            {/* Action Buttons - Fully Accessible with Subdomain Link */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => scrollTo('works')}
                aria-label="Scroll to portfolio works and video edits"
                className="min-h-[44px] px-7 py-3 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span>Explore Works & Cuts</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setSubdomain('video')}
                aria-label="Open dedicated video portfolio subdomain"
                className="min-h-[44px] px-6 py-3 rounded-full bg-neutral-900 text-white dark:bg-[#091710] dark:text-emerald-300 hover:bg-neutral-800 dark:hover:bg-[#0f241a] border border-neutral-800 dark:border-emerald-900 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <Video className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Video Subdomain</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('assets')}
                aria-label="Scroll to free audience asset vault"
                className="min-h-[44px] px-6 py-3 rounded-full bg-neutral-100 dark:bg-[#06120b] hover:bg-neutral-200 dark:hover:bg-[#091a10] border border-neutral-200 dark:border-emerald-950 text-black dark:text-neutral-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <Download className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <span>Free Asset Vault</span>
              </button>
            </div>

            {/* Social Channels Row - Accessible & Decongested */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5">
                Content Channels & Community
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SOCIAL_CHANNELS.map((ch, idx) => (
                  <a
                    key={idx}
                    href={ch.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Visit Yonas on ${ch.name} (${ch.audience} ${ch.metricLabel})`}
                    className="min-h-[44px] p-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black dark:text-white group-hover:underline">
                        {ch.name}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {ch.audience}
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate">{ch.handle}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Video Editor Preview Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-4 sm:p-5 shadow-xl relative overflow-hidden">
              {/* Top Window Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 dark:border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-bold text-neutral-500 ml-1.5">
                    YONAS_SHOWREEL_60FPS.mp4
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black text-white dark:bg-white dark:text-black">
                  4K 60FPS
                </span>
              </div>

              {/* Video Mock Screen */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black group border border-neutral-800">
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80"
                  alt="Video editing showreel preview"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isPlayingTeaser ? 'scale-105 filter saturate-150' : 'brightness-90 group-hover:scale-102'
                  }`}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Center Play / Pause Button */}
                <button
                  type="button"
                  onClick={() => setIsPlayingTeaser(!isPlayingTeaser)}
                  className="absolute inset-0 m-auto min-w-[48px] min-h-[48px] w-14 h-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label={isPlayingTeaser ? 'Pause showreel simulation' : 'Play showreel simulation'}
                >
                  <Play className={`w-6 h-6 ml-0.5 ${isPlayingTeaser ? 'text-emerald-600' : 'text-black'}`} aria-hidden="true" />
                </button>

                {/* Video Info Overlays & Audio Toggle */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    aria-label={isMuted ? 'Unmute showreel preview audio' : 'Mute showreel preview audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" aria-hidden="true" />
                    <span className="font-mono text-[11px] font-bold">
                      {isPlayingTeaser ? '00:24 / 00:48 [PLAYING]' : '00:00 / 00:48 [READY]'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                    PR · AE · BLENDER
                  </span>
                </div>
              </div>

              {/* Streamlined Timeline Scrubber */}
              <div className="mt-3.5 p-3 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>TIMELINE: 42 AUDIO & VIDEO TRACKS</span>
                  <span className="text-black dark:text-white font-bold">88% RETENTION</span>
                </div>

                {/* Clean scrubber progress bar */}
                <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: isPlayingTeaser ? '50%' : '15%' }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  <span>Frame-Perfect Cuts</span>
                  <span>Zero Fluff Pacing</span>
                </div>
              </div>

              {/* Metrics Badge */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                  <div className="font-display font-black text-base text-black dark:text-white">250+</div>
                  <div className="text-[10px] font-bold text-neutral-400 uppercase">Videos Cut</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                  <div className="font-display font-black text-base text-black dark:text-white">450K+</div>
                  <div className="text-[10px] font-bold text-neutral-400 uppercase">Total Reach</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                  <div className="font-display font-black text-base text-black dark:text-white">100%</div>
                  <div className="text-[10px] font-bold text-neutral-400 uppercase">Certified Code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
