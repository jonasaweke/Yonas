import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider, useData } from './context/DataContext';
import { SubdomainBar } from './components/SubdomainBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { AssetVaultSection } from './components/AssetVaultSection';
import { ToolboxSection } from './components/ToolboxSection';
import { LifestyleCommunitySection } from './components/LifestyleCommunitySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoPortfolioView } from './components/VideoPortfolioView';
import { AdminDashboard } from './components/AdminDashboard';

function PortfolioApp() {
  const { subdomain } = useData();
  const [activeSection, setActiveSection] = useState<string>('home');

  // Active section scroll spy
  useEffect(() => {
    const sections = ['home', 'works', 'assets', 'toolbox', 'community', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [subdomain]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050a07] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-200 antialiased selection:bg-emerald-500 selection:text-black">
      {/* Persistent Subdomain Bar (main.yonas.me / video.yonas.me) */}
      <SubdomainBar />

      {/* Subdomain View Routing */}
      {subdomain === 'admin' ? (
        // Dedicated CMS Admin Studio for Yonas Only
        <AdminDashboard />
      ) : subdomain === 'video' ? (
        // Dedicated Video Portfolio Subdomain with Aspect Ratio filters (16:9, 9:16, 1:1)
        <div>
          <VideoPortfolioView />
          <Footer />
        </div>
      ) : (
        // Main Brand Hub View
        <div>
          <Navbar activeSection={activeSection} />

          <main id="main-content">
            {/* 1. Hero: Video Editor, AI Developer, Marketer, Creator */}
            <HeroSection />

            {/* 2. Flagship Works & Cuts: CapCut, PR, AE, Blender, Photoshop, AI */}
            <ProjectsGallery />

            {/* 3. Free Asset Vault: For My Audience (LUTs, SFX, 3D, PSDs, Prompts) */}
            <AssetVaultSection />

            {/* 4. Toolkit & Verified Programming Certificate */}
            <ToolboxSection />

            {/* 5. Daily Discipline (Fitness & Lifting) & Creator Community */}
            <LifestyleCommunitySection />

            {/* 6. Direct Collab & Booking */}
            <ContactSection />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <PortfolioApp />
      </ThemeProvider>
    </DataProvider>
  );
}
