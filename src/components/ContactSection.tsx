import React, { useState } from 'react';
import {
  Send,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  Clock,
  MapPin,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'Video Editing',
    budget: '$500 - $1,500',
    message: '',
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-neutral-50 dark:bg-black border-b border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Outreach & Vibe */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-black dark:text-white" />
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  BOOKING & COLLABORATION
                </span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black dark:text-white leading-[0.95]">
                LET'S MAKE SOMETHING VIRAL.
              </h2>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Need high-retention video edits for YouTube or TikTok? 3D product animations in Blender? Custom AI tools or thumbnail packages? Send a message and let's get to work.
            </p>

            {/* Quick Email Copy Box */}
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white flex items-center justify-center">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                    Direct Email
                  </div>
                  <div className="text-sm font-bold text-black dark:text-white">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white hover:opacity-75 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Copy direct email address to clipboard"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              </button>
            </div>

            {/* Quick Commitments */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-white">
                  <Clock className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  <span>24-Hour Reply</span>
                </div>
                <div className="text-[11px] text-neutral-500">Fast project scoping & estimate</div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-white">
                  <MapPin className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  <span>Global Remote</span>
                </div>
                <div className="text-[11px] text-neutral-500">Working with creators worldwide</div>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek, Uncongested Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 sm:p-10 shadow-sm space-y-6">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in" role="status">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black dark:text-white">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                    Thanks for reaching out, {formData.name}. Yonas has received your project details and will reply directly to <strong className="text-black dark:text-white">{formData.email}</strong> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    aria-label="Send another project inquiry"
                    className="mt-4 min-h-[44px] px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. David Alex"
                        className="w-full min-h-[44px] px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. david@creator.com"
                        className="w-full min-h-[44px] px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Type */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-service" className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                        Project / Service
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full min-h-[44px] px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-black dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
                      >
                        <option value="Video Editing">Viral Video Editing (PR / AE / CapCut)</option>
                        <option value="3D Animation">3D Motion & Product Renders (Blender)</option>
                        <option value="Thumbnails">High-CTR Thumbnails (Photoshop)</option>
                        <option value="AI & Code">AI Tool & Automation Development</option>
                        <option value="Sponsorship">Content Sponsorship & Channel Collab</option>
                        <option value="General">General Question / Say Hi</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-budget" className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                        Approximate Budget
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full min-h-[44px] px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-black dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
                      >
                        <option value="<$500">&lt; $500 (Quick Turnaround / Trial)</option>
                        <option value="$500 - $1,500">$500 – $1,500 (Full Video / 3D Asset)</option>
                        <option value="$1,500 - $3,500">$1,500 – $3,500 (Package / Multiple Cuts)</option>
                        <option value="$3,500+">$3,500+ (Monthly Retainer / AI Platform)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Project Goals & Vision *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your channel, footage length, desired editing style, reference videos, or AI requirements..."
                      className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      aria-label="Send project inquiry to Yonas"
                      className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Send Project Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
