import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Code2,
  Sliders,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import { TOOLBOX_ITEMS } from '../data/portfolioData';
import { useData } from '../context/DataContext';
import { Certificate } from '../types';

export const ToolboxSection: React.FC = () => {
  const { certificates } = useData();
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  // Default to first certificate if modal opened without specific cert
  const currentCert = activeCert || certificates[0];

  // Handle escape key to close certificate modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      }
    };
    if (activeCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeCert]);

  return (
    <section
      id="toolbox"
      className="py-16 md:py-24 bg-neutral-50 dark:bg-[#060e09] border-b border-neutral-200 dark:border-emerald-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                ARSENAL & CREDENTIALS
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-neutral-900 dark:text-white">
              TOOLKIT & CERTIFICATE
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
            The multi-disciplinary toolkit powering obsessive video edits, 3D visual effects, and intelligent AI automation scripts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Software & Skill Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOLBOX_ITEMS.map((tool) => (
              <div
                key={tool.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#091710] border border-neutral-200 dark:border-emerald-950 space-y-2.5 shadow-sm hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-black dark:text-white">
                    {tool.name}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-emerald-950/50 text-[10px] font-bold uppercase tracking-wider text-black dark:text-emerald-300 border border-transparent dark:border-emerald-800/40">
                    {tool.experienceLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  <span>{tool.category}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">{tool.proficiency}</span>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {tool.highlight}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Verified Certificates */}
          <div className="lg:col-span-5 space-y-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="rounded-3xl bg-white dark:bg-[#091710] border border-neutral-200 dark:border-emerald-950 p-6 sm:p-7 space-y-5 shadow-md relative overflow-hidden group hover:border-emerald-500/60 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                      Official Credential
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    <span>Verified</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-black text-xl text-black dark:text-white uppercase tracking-tight">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Issued by {cert.issuer} · {cert.issueDate}
                  </p>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {cert.description}
                </p>

                {/* Verified Skills */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Certified Competencies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-emerald-950/40 border border-neutral-200 dark:border-emerald-900/60 text-[11px] font-semibold text-neutral-800 dark:text-emerald-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ID and Verification Action */}
                <div className="pt-4 border-t border-neutral-200 dark:border-emerald-950/80 flex items-center justify-between">
                  <div className="font-mono text-[11px] text-neutral-400">
                    ID: {cert.credentialId}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    aria-haspopup="dialog"
                    aria-expanded={activeCert?.id === cert.id}
                    aria-label={`View verified certificate for ${cert.name}`}
                    className="min-h-[44px] px-5 py-2.5 rounded-full bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}

            {/* Why Code + Video Matters Callout */}
            <div className="p-6 rounded-3xl bg-neutral-100 dark:bg-[#07130d] border border-neutral-200 dark:border-emerald-950 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                <Sparkles className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <span>The Engineering Advantage in Editing</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Programming fluency unlocks automated batch scripts for rendering, custom subtitle generators, and algorithmic retention models.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal - Accessible Dialog */}
      {currentCert && activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#091710] border border-neutral-200 dark:border-emerald-800 p-8 space-y-6 shadow-2xl">
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setActiveCert(null)}
              aria-label="Close certificate modal"
              className="absolute top-5 right-5 min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white hover:opacity-75 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Modal Certificate Frame */}
            <div className="p-8 rounded-2xl border-4 border-double border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-[#050e08] text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 text-black mx-auto shadow-md">
                <Award className="w-8 h-8" aria-hidden="true" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Certificate of Achievement & Verification
                </div>
                <h3
                  id="cert-modal-title"
                  className="font-display font-black text-2xl uppercase tracking-tight text-black dark:text-white mt-1"
                >
                  YONAS AWEKE
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  has successfully completed and demonstrated certified proficiency in
                </p>
                <div className="text-lg font-bold text-black dark:text-white mt-2">
                  {currentCert.name}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-emerald-950 flex flex-wrap items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-2">
                <span>Credential: {currentCert.credentialId}</span>
                <span className="text-emerald-500 font-bold">STATUS: 100% VERIFIED</span>
                <span>Issued: {currentCert.issueDate}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
