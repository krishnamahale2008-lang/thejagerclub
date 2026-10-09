import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenOrganizer: () => void;
}

export default function Navbar({ onOpenOrganizer: _onOpenOrganizer }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090d]/90 backdrop-blur-md border-b border-white/[0.08] shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-black tracking-tight text-white hover:text-[#ff5500] transition-colors whitespace-nowrap shrink-0 font-display"
        >
          THE JAGER CLUB
        </a>

        {/* Zone 2: Nav Links (Clean single-line text links with hover effect) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-zinc-300">
          <button
            onClick={() => scrollToSection('experience')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('event-details')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Event Details
          </button>
          <button
            onClick={() => scrollToSection('passes')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Passes
          </button>
          <button
            onClick={() => scrollToSection('faqs')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            FAQs
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => scrollToSection('passes')}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#ff5500] hover:bg-[#ff6f26] active:scale-[0.98] transition-all rounded-md shadow-lg shadow-[#ff5500]/25 cursor-pointer whitespace-nowrap shrink-0"
          >
            Get Your Pass
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f] border-b border-white/[0.08] px-6 py-6 space-y-4">
          <button
            onClick={() => scrollToSection('experience')}
            className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-[#ff5500]"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('event-details')}
            className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-[#ff5500]"
          >
            Event Details
          </button>
          <button
            onClick={() => scrollToSection('passes')}
            className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-[#ff5500]"
          >
            Passes & Registration
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-[#ff5500]"
          >
            Atmosphere
          </button>
          <button
            onClick={() => scrollToSection('faqs')}
            className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-[#ff5500]"
          >
            FAQs
          </button>
        </div>
      )}
    </header>
  );
}
