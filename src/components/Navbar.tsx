import React, { useEffect, useState } from 'react';
import {
  Moon,
  Sun,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Youtube,
  Download,
  Video,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

interface NavbarProps {
  activeSection: string;
}

export const NAV_LINKS = [
  { id: 'works', label: 'Works', href: '#works' },
  { id: 'assets', label: 'Free Assets', href: '#assets' },
  { id: 'toolbox', label: 'Toolkit & Cert', href: '#toolbox' },
  { id: 'community', label: 'Community', href: '#community' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const { personalInfo, setSubdomain } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-10 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#050a07]/95 backdrop-blur-md border-b border-neutral-200 dark:border-emerald-950/80 py-3 shadow-md'
          : 'bg-white/80 dark:bg-[#050a07]/80 backdrop-blur-sm border-b border-neutral-100 dark:border-emerald-950/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
            id="nav-logo-btn"
            aria-label="Yonas Portfolio - Back to top"
          >
            <span className="w-8 h-8 rounded-full bg-emerald-500 text-black font-display font-black text-sm flex items-center justify-center tracking-tighter shadow-sm" aria-hidden="true">
              Y
            </span>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tight text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                {personalInfo.brandName}
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 dark:text-emerald-400/80">
                Video · AI · Creator
              </span>
            </div>
          </a>

          {/* Center Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-[#091710] p-1.5 rounded-full border border-neutral-200/80 dark:border-emerald-950" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`min-h-[44px] inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isActive
                      ? 'bg-emerald-500 text-black shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {link.label === 'Free Assets' ? (
                    <span className="flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                      {link.label}
                    </span>
                  ) : (
                    link.label
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Quick Link to Dedicated Video Subdomain */}
            <button
              type="button"
              onClick={() => setSubdomain('video')}
              aria-label="Open dedicated video portfolio subdomain"
              className="hidden lg:inline-flex min-h-[44px] items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Video className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Video Hub</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light visual theme' : 'Switch to dark visual theme'}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-emerald-400" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            </button>

            {/* Collab / Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              aria-label="Book video edit or collaboration"
              className="inline-flex min-h-[44px] items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all shadow-sm font-sans"
              id="nav-hire-btn"
            >
              <span>Book Edit</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="md:hidden pt-4 pb-6 mt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2 animate-in fade-in"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSubdomain('video');
                }}
                className="w-full min-h-[44px] flex items-center justify-center py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Video Portfolio Subdomain
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
