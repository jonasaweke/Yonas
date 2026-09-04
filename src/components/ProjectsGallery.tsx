import React, { useState, useEffect } from 'react';
import {
  Play,
  Film,
  Box,
  Image,
  Code2,
  Sparkles,
  ExternalLink,
  X,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Project, ProjectCategory } from '../types';

export const ProjectsGallery: React.FC = () => {
  const { projects } = useData();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'Video Editing',
    '3D & Motion',
    'Thumbnails & Graphics',
    'AI & Tools',
  ];

  // Close modal on Escape key and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProjectModal(null);
      }
    };
    if (activeProjectModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeProjectModal]);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="works"
      className="py-16 md:py-24 bg-neutral-50 dark:bg-[#060e09] border-b border-neutral-200 dark:border-emerald-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Film className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                PORTFOLIO & CUTS
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-neutral-900 dark:text-white">
              FLAGSHIP WORKS & EDITS
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
            Click any piece to inspect the pacing breakdown, software passes, and audience metrics.
          </p>
        </div>

        {/* Category Filter Pills - Accessible Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="projects-grid"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isSelected
                    ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-white dark:bg-[#09160f] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-emerald-950'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          id="projects-grid"
          role="region"
          aria-live="polite"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveProjectModal(project)}
              aria-label={`View project details for ${project.title} (${project.category})`}
              className="group rounded-3xl bg-white dark:bg-[#091710] border border-neutral-200 dark:border-emerald-950 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all overflow-hidden flex flex-col text-left cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-black w-full">
                <img
                  src={project.thumbnailUrl}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                    {project.duration || '0:45'}
                  </span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Play Button Hover Icon */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/95 text-black flex items-center justify-center opacity-90 group-hover:scale-110 transition-all shadow-lg pointer-events-none">
                  <Play className="w-5 h-5 ml-0.5" aria-hidden="true" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3 w-full">
                <div>
                  <h3 className="font-display font-bold text-lg text-black dark:text-white group-hover:underline">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                {/* Software Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.software.map((sw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-900 text-[10px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
                    >
                      {sw}
                    </span>
                  ))}
                </div>

                {/* Quick Metric highlight */}
                {project.stats && project.stats.length > 0 && (
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-bold uppercase text-[10px]">
                      {project.stats[0].label}
                    </span>
                    <span className="font-display font-black text-black dark:text-white">
                      {project.stats[0].value}
                    </span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Detail Modal - Fully Accessible */}
      {activeProjectModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveProjectModal(null)}
              aria-label="Close project modal dialog"
              className="absolute top-5 right-5 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white hover:opacity-75 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Modal Media Preview */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800">
              <img
                src={activeProjectModal.thumbnailUrl}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="p-3.5 rounded-full bg-white text-black flex items-center gap-2 font-bold text-xs uppercase tracking-wider shadow-lg">
                  <Play className="w-4 h-4 ml-0.5" aria-hidden="true" />
                  <span>Interactive Edit Breakdown</span>
                </div>
              </div>
            </div>

            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-wider">
                  {activeProjectModal.category}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Duration: {activeProjectModal.duration}
                </span>
              </div>
              <h2
                id="project-modal-title"
                className="font-display font-black text-2xl sm:text-3xl text-black dark:text-white uppercase tracking-tight"
              >
                {activeProjectModal.title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                {activeProjectModal.description}
              </p>
            </div>

            {/* Metrics Grid */}
            {activeProjectModal.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeProjectModal.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      {stat.label}
                    </div>
                    <div className="font-display font-black text-xl text-black dark:text-white mt-0.5">
                      {stat.value}
                    </div>
                  </div>
                ))}
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Resolution & Master
                  </div>
                  <div className="font-display font-black text-xl text-black dark:text-white mt-0.5">
                    4K Ultra HD
                  </div>
                </div>
              </div>
            )}

            {/* Software Stack */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Production Pipeline
              </div>
              <div className="flex flex-wrap gap-2">
                {activeProjectModal.software.map((sw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-black dark:text-white"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Highlights / Breakdown */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                Keyframe & Workflow Highlights
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                {activeProjectModal.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
