/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Settings, Ticket } from 'lucide-react';
import { EventConfig } from './types';
import { getEventConfig } from './services/storage';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import EventInfoSection from './components/EventInfoSection';
import PassesSection from './components/PassesSection';
import GallerySection from './components/GallerySection';
import FaqSection from './components/FaqSection';
import ContactFooter from './components/ContactFooter';
import OrganizerModal from './components/OrganizerModal';

export default function App() {
  const [config, setConfig] = useState<EventConfig>(getEventConfig());
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [showStickyPassBtn, setShowStickyPassBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyPassBtn(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConfigUpdated = (newConfig: EventConfig) => {
    setConfig(newConfig);
  };

  const scrollToPasses = () => {
    const el = document.getElementById('passes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08080b] text-[#f4f4f7] selection:bg-[#ff5500] selection:text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar onOpenOrganizer={() => setIsOrganizerOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Section 2: Hero */}
        <Hero config={config} onOpenOrganizer={() => setIsOrganizerOpen(true)} />

        {/* Section 3: The Experience */}
        <ExperienceSection config={config} onOpenOrganizer={() => setIsOrganizerOpen(true)} />

        {/* Section 4: Event Information */}
        <EventInfoSection config={config} onOpenOrganizer={() => setIsOrganizerOpen(true)} />

        {/* Section 5: Passes and Registration */}
        <PassesSection config={config} onOpenOrganizer={() => setIsOrganizerOpen(true)} />

        {/* Section 6: Gallery & Atmosphere */}
        <GallerySection />

        {/* Section 7: FAQs */}
        <FaqSection config={config} />
      </main>

      {/* Section 8: Contact & Footer */}
      <ContactFooter config={config} onOpenOrganizer={() => setIsOrganizerOpen(true)} />

      {/* Organizer Customizer Modal */}
      <OrganizerModal
        config={config}
        isOpen={isOrganizerOpen}
        onClose={() => setIsOrganizerOpen(false)}
        onConfigUpdated={handleConfigUpdated}
      />

      {/* Discreet floating quick buttons (Sticky Mobile/Desktop Action & Organizer Access) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {showStickyPassBtn && (
          <button
            onClick={scrollToPasses}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff5500] hover:bg-[#ff6f26] text-black font-extrabold uppercase text-xs tracking-wider shadow-2xl shadow-[#ff5500]/40 transition-all cursor-pointer animate-fade-in"
          >
            <Ticket className="w-4 h-4" />
            <span>Get Pass</span>
          </button>
        )}

        <button
          onClick={() => setIsOrganizerOpen(true)}
          className="p-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 shadow-xl backdrop-blur-md transition-all cursor-pointer active:scale-95 group"
          title="Open Organizer Customizer"
          aria-label="Open Organizer Customizer"
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform text-[#ff5500]" />
        </button>
      </div>
    </div>
  );
}
