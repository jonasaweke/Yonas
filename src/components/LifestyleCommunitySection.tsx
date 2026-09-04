import React, { useState } from 'react';
import {
  Dumbbell,
  Users,
  Flame,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Send,
  Heart,
} from 'lucide-react';
import { FITNESS_DISCIPLINE, COMMUNITY_INFO } from '../data/portfolioData';

export const LifestyleCommunitySection: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section
      id="community"
      className="py-16 md:py-24 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Card 1: Fitness & Exercise Discipline */}
          <div className="lg:col-span-6 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">
                  LIFESTYLE & MINDSET
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-black dark:text-white uppercase tracking-tight">
                  {FITNESS_DISCIPLINE.title}
                </h3>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mt-1">
                  {FITNESS_DISCIPLINE.subtitle}
                </p>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {FITNESS_DISCIPLINE.description}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              {FITNESS_DISCIPLINE.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
                  <div className="font-display font-black text-base text-black dark:text-white">
                    {m.value}
                  </div>
                  <div className="text-[10px] font-bold text-neutral-400 uppercase mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Creator Community Hub */}
          <div className="lg:col-span-6 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">
                  {COMMUNITY_INFO.membersCount} CREATORS
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-black dark:text-white uppercase tracking-tight">
                  {COMMUNITY_INFO.name}
                </h3>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mt-1">
                  {COMMUNITY_INFO.tagline}
                </p>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {COMMUNITY_INFO.description}
              </p>

              {/* Community Link Channels */}
              <div className="space-y-2 pt-2">
                {COMMUNITY_INFO.platforms.map((plat, idx) => (
                  <a
                    key={idx}
                    href={plat.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Join ${plat.name} - ${plat.label}`}
                    className="min-h-[44px] p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <div>
                      <div className="text-xs font-bold text-black dark:text-white group-hover:underline">
                        {plat.name}
                      </div>
                      <div className="text-[11px] text-neutral-500">{plat.label}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">
                      {plat.badge}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter quick subscribe */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <label htmlFor="community-email-input" className="sr-only">
                  Email address for weekly free creator asset drops
                </label>
                <input
                  id="community-email-input"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email for weekly free assets..."
                  className="flex-1 min-h-[44px] px-4 py-2.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to weekly creator asset drops"
                  className="min-h-[44px] px-5 py-2.5 rounded-full bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {subscribed ? 'Joined!' : 'Join Drops'}
                </button>
              </form>
              {subscribed && (
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1.5" role="status">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Welcome to the community! Check your inbox for the latest asset drops.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
