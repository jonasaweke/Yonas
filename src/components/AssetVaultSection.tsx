import React, { useState } from 'react';
import {
  Download,
  Sparkles,
  Check,
  FileCode,
  Layers,
  Volume2,
  Box,
  Share2,
  ArrowDownCircle,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { CreatorAsset } from '../types';

export const AssetVaultSection: React.FC = () => {
  const { assets } = useData();
  const [downloadedAssetId, setDownloadedAssetId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleDownload = (asset: CreatorAsset) => {
    setDownloadedAssetId(asset.id);

    // Create a real text/markdown file download with full instructions & asset details
    const content = `# ${asset.title}
Created by Yonas (Video Editor & AI Developer)
YouTube: https://youtube.com/@yonascreates
Instagram: https://instagram.com/@yonas_visuals
TikTok: https://tiktok.com/@yonas.edits

Category: ${asset.category}
File Format: ${asset.fileFormat}
File Size: ${asset.fileSize}

## Quick Installation Instructions:
1. Extract or place these files directly into your editing software (CapCut, Premiere Pro, After Effects, or Blender).
2. For LUTs (.cube): Apply in Premiere Lumetri Color or CapCut "Filters -> Import LUT".
3. For SFX (.wav): Drag into audio track 2 or 3 underneath dialogue.
4. For Blender (.blend): Open in Blender 4.0+ and press F12 to render.
5. For Photoshop (.psd): Double-click smart objects to replace headshots and text layers.

Join our creator community on Discord: https://discord.com
Enjoy creating high-retention content!
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${asset.id}-instructions-pack.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadedAssetId(null);
    }, 4000);
  };

  const handleCopyVaultLink = () => {
    navigator.clipboard.writeText(window.location.origin + '#assets');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <section
      id="assets"
      className="py-16 md:py-24 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                CREATOR ASSET VAULT
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black dark:text-white">
              FREE ASSETS FOR MY AUDIENCE
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyVaultLink}
              aria-label="Copy link to share creator asset vault"
              className="min-h-[44px] px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:opacity-80 transition-opacity flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" /> : <Share2 className="w-3.5 h-3.5" aria-hidden="true" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Vault'}</span>
            </button>
          </div>
        </div>

        {/* Free Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => {
            const isDownloaded = downloadedAssetId === asset.id;

            return (
              <div
                key={asset.id}
                className="rounded-3xl bg-neutral-50 dark:bg-[#091710] border border-neutral-200 dark:border-emerald-950 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm group"
              >
                <div className="space-y-3.5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">
                      {asset.category}
                    </span>
                    {asset.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                        {asset.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-display font-bold text-xl text-black dark:text-white group-hover:underline">
                      {asset.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                      {asset.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {asset.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Stats & Download Button */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>FORMAT: {asset.fileFormat}</span>
                    <span>SIZE: {asset.fileSize}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownload(asset)}
                    aria-label={`Download ${asset.title} free pack`}
                    className={`w-full min-h-[44px] py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      isDownloaded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-sm'
                    }`}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>Pack Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" aria-hidden="true" />
                        <span>Download Free Pack ({asset.downloadCount} dl)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Audience Notice Box */}
        <div className="mt-10 p-6 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm font-bold text-black dark:text-white">
                100% Free For Personal & Commercial Projects
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Instant download, no barriers. Use these assets to elevate your YouTube, TikTok, and client edits.
              </div>
            </div>
          </div>
          <a
            href="#community"
            aria-label="Join Creator Community Discord"
            className="min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Join Creator Discord
          </a>
        </div>
      </div>
    </section>
  );
};
