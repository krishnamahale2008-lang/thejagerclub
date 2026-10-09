import { useState } from 'react';
import { Sparkles, X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  aspectClass: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'hero',
    src: '/src/assets/images/hero_desi_club_diwali_1791578048184.jpg',
    title: 'Main Room Diwali Fest Stage',
    caption: 'Suspended glowing diyas, synchronized laser grid, and high-energy crowd.',
    aspectClass: 'md:col-span-2 md:row-span-2 h-80 sm:h-96 md:h-full',
  },
  {
    id: 'dj',
    src: '/src/assets/images/experience_dj_booth_1791578061860.jpg',
    title: 'The Sound Console',
    caption: 'Cutting-edge CDJ setups powering Punjabi club bass and Bollywood reworks.',
    aspectClass: 'h-64 sm:h-72',
  },
  {
    id: 'decor',
    src: '/src/assets/images/experience_diwali_decor_1791578083363.jpg',
    title: 'Neon Diya Lounge Installations',
    caption: 'Custom acrylic ultraviolet diyas and plush booth seating.',
    aspectClass: 'h-64 sm:h-72',
  },
  {
    id: 'dancefloor',
    src: '/src/assets/images/experience_dancefloor_neon_1791578073014.jpg',
    title: 'The Dancefloor Vibe',
    caption: 'Immersive golden festive confetti and cutting neon orange laser beams.',
    aspectClass: 'md:col-span-3 h-64 sm:h-80',
  },
];

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#09090d] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff5500] mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Atmosphere & Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display mb-4 [text-wrap:balance]">
            Electric Visuals. Unmatched Energy.
          </h2>
          <p className="text-base text-zinc-400">
            A glimpse into the distinct sonic and visual universe of THE JAGER CLUB's Diwali club edition.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`group relative overflow-hidden rounded-xl bg-zinc-900 border border-white/10 cursor-pointer ${item.aspectClass}`}
            >
              <img
                src={item.src}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-300 max-w-sm line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#ff5500] group-hover:text-black flex items-center justify-center transition-colors">
                    <ZoomIn className="w-4 h-4 text-white group-hover:text-black" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#101018] rounded-xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-[#101018] border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-1 font-display">
                {selectedItem.title}
              </h3>
              <p className="text-sm text-zinc-400">
                {selectedItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
