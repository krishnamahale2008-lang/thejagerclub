import { useState } from 'react';
import { MessageCircle, Instagram, Mail, Shield, Settings, X, ArrowUpRight } from 'lucide-react';
import { EventConfig } from '../types';

interface ContactFooterProps {
  config: EventConfig;
  onOpenOrganizer: () => void;
}

export default function ContactFooter({ config, onOpenOrganizer }: ContactFooterProps) {
  const [showTermsModal, setShowTermsModal] = useState(false);

  const cleanWhatsApp = config.whatsappNumber.replace(/[^0-9]/g, '');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07070a] border-t border-white/[0.08] text-zinc-400 pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Organizer Direct Contact Strip */}
        <div className="rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-[#12121c] via-[#101018] to-[#12121c] border border-white/10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff5500]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff5500] block mb-2">
                Organizer Contact & Inquiries
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase text-white font-display mb-3">
                Have questions or group requests?
              </h3>
              <p className="text-sm text-zinc-400 max-w-lg">
                Connect directly with THE JAGER CLUB organizing crew for pass status queries, VIP table requests, or venue partner collaborations.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-3 justify-start lg:justify-end">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                  'Hi THE JAGER CLUB team, I have an inquiry regarding the Desi Club Night Diwali Edition passes.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba5a] transition-all cursor-pointer shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              {/* Instagram Button */}
              <a
                href={`https://instagram.com/${config.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#ec4899]" />
                <span>{config.instagramHandle}</span>
              </a>

              {/* Email Button */}
              <a
                href={`mailto:${config.email}?subject=${encodeURIComponent(
                  'THE JAGER CLUB: Diwali Edition Inquiry'
                )}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#a855f7]" />
                <span>Email Support</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/[0.08]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-2xl font-black tracking-tight text-white font-display block">
              {config.brandName}
            </span>
            <p className="text-sm text-zinc-400 font-medium max-w-sm">
              "{config.tagline}"
            </p>
            <p className="text-xs text-zinc-500 max-w-md leading-relaxed">
              Curating elevated South Asian nightlife experiences for a discerning Gen-Z community. Strictly limited 100-capacity Diwali night.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('experience')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('event-details')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Event Details & Logistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('passes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Passes & Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Atmosphere Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faqs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Organizer Mode */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-4">
              Policies & Control
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>Admission & Privacy Terms</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOrganizer}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-zinc-300 font-medium"
                >
                  <Settings className="w-3.5 h-3.5 text-[#a855f7]" />
                  <span>Organizer Controls</span>
                </button>
              </li>
              <li className="pt-2 text-zinc-500 text-[11px]">
                Capacity strictly 100 max · No unauthorized resales
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} {config.brandName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowTermsModal(true)}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setShowTermsModal(true)}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenOrganizer}
              className="hover:text-white transition-colors cursor-pointer text-zinc-400 flex items-center gap-1"
            >
              <span>Edit Details</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Terms & Admission Policy Modal */}
      {showTermsModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#12121c] border border-white/15 rounded-xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold uppercase text-white font-display">
                Admission Rules & Registration Terms
              </h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                <strong>1. Strict Capacity Control:</strong> To maintain an exclusive, safe, and vibrant atmosphere, total attendance is strictly capped at approximately {config.capacityLimit} guests. Pass requests are subject to confirmation.
              </p>
              <p>
                <strong>2. Age Verification & Identification:</strong> All patrons must meet the stated age requirement ({config.entryAge}) and present a physical, original government-issued photo ID (Passport, Driver’s License, or National ID Card). Soft copies or digital photos are strictly invalid.
              </p>
              <p>
                <strong>3. Right of Admission Reserved (R.O.A.R):</strong> The venue and event organizers reserve the unconditional right to refuse entry or eject individuals exhibiting unruly, intoxicated, or inappropriate behavior without entitlement to any refund.
              </p>
              <p>
                <strong>4. Dress Code:</strong> Compliance with the event dress code ({config.dressCode}) is mandatory. The club management reserves the right to decline entry to guests wearing beachwear, athletic shorts, or inappropriate attire.
              </p>
              <p>
                <strong>5. Pass Non-Transferability:</strong> Passes generated through this system are personalized and linked to the registered mobile number. Unofficial reselling or black-marketing will lead to immediate cancellation of passes.
              </p>
              <p>
                <strong>6. Photography & Media:</strong> By attending, guests consent to being filmed and photographed for official THE JAGER CLUB event recap videos and social media showcases.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-5 py-2 rounded-md bg-[#ff5500] text-black font-bold uppercase text-xs cursor-pointer"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
