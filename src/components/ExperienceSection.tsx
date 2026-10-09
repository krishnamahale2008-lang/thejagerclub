import { Music, Zap, Flame, Camera, UtensilsCrossed } from 'lucide-react';
import { EventConfig } from '../types';

interface ExperienceProps {
  config: EventConfig;
  onOpenOrganizer: () => void;
}

export default function ExperienceSection({ config, onOpenOrganizer }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#09090d] relative overflow-hidden">
      {/* Subtle ambient light glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#ff5500]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff5500] mb-3">
            <span>The Experience</span>
            <span aria-hidden="true" className="text-zinc-700">·</span>
            <span className="text-zinc-400">Nightclub Curation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display mb-5 [text-wrap:balance]">
            Reimagining Diwali through a modern nightlife lens.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
            No stuffy banquet halls. No tired playlists. THE JAGER CLUB blends the electric vibrancy of the festival of lights with top-tier underground club culture, heavy basslines, and an intimate guest list of 100 people.
          </p>
        </div>

        {/* Dynamic Bento Grid of Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: DJ & Desi Music (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-xl bg-[#101017] border border-white/10 hover:border-[#ff5500]/50 transition-all duration-300 flex flex-col justify-between">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              <img
                src="/src/assets/images/experience_dj_booth_1791578061860.jpg"
                alt="DJ mixing Punjabi and Bollywood club hits at Pioneer mixer"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101017] via-[#101017]/40 to-transparent" />
            </div>

            <div className="p-6 sm:p-8 relative z-10 -mt-16 bg-[#101017]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#ff5500] mb-2">
                <Music className="w-4 h-4" />
                <span>01. Sound & Rhythm</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display mb-3">
                Non-Stop Desi Bass & Club Anthems
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
                Curated sets spanning high-energy Punjabi club cuts, tech-Bollywood remixes, UK Bhangra edits, and global South Asian bass music dialed for pure dance floor momentum.
              </p>
              <div className="text-xs text-zinc-400 flex items-center gap-2">
                <span className="text-zinc-500">Curated Lineup:</span>
                <span className="text-zinc-200">{config.djMusicNote}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Dance Floor & Atmosphere */}
          <div className="group relative overflow-hidden rounded-xl bg-[#101017] border border-white/10 hover:border-[#a855f7]/50 transition-all duration-300 flex flex-col">
            <div className="relative h-60 sm:h-72 w-full overflow-hidden">
              <img
                src="/src/assets/images/experience_dancefloor_neon_1791578073014.jpg"
                alt="Vibrant dance floor with young clubgoers and neon lasers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101017] via-[#101017]/30 to-transparent" />
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#a855f7] mb-2">
                  <Zap className="w-4 h-4" />
                  <span>02. The Dance Floor</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display mb-3">
                  Intimate 100-Guest Energy
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Strict capacity cap ensures a packed yet comfortable vibe where everyone is there for the music. High-power laser grids, haze cannons, and synchronized lighting.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-400">
                <span>Capacity: Exactly capped at ~100 vetted passes</span>
              </div>
            </div>
          </div>

          {/* Card 3: Diwali-Inspired Neon Decor */}
          <div className="group relative overflow-hidden rounded-xl bg-[#101017] border border-white/10 hover:border-[#ec4899]/50 transition-all duration-300 flex flex-col">
            <div className="relative h-60 sm:h-72 w-full overflow-hidden">
              <img
                src="/src/assets/images/experience_diwali_decor_1791578083363.jpg"
                alt="Modern neon diya installations and sleek lounge decor"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101017] via-[#101017]/30 to-transparent" />
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#ec4899] mb-2">
                  <Flame className="w-4 h-4" />
                  <span>03. Festive Lighting</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display mb-3">
                  Neon Diyas & Cyber Rangoli
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Custom acrylic neon diya installations, ultraviolet projection mappings, and contemporary abstract rangoli geometry replace conventional decor for a razor-sharp aesthetic.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-400">
                <span>Theme: Neon Orange, Hot Pink & Deep Charcoal</span>
              </div>
            </div>
          </div>

          {/* Card 4: Photo-Worthy Moments */}
          <div className="group relative overflow-hidden rounded-xl bg-[#101017] border border-white/10 hover:border-[#ff5500]/50 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#ff5500] mb-3">
                <Camera className="w-4 h-4" />
                <span>04. Visuals & Memory</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display mb-3">
                Photo-Worthy Backdrops & Roaming Cam
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                Dedicated flash photography and neon installations engineered for your social feed. Official event recap gallery delivered to all pass holders post-night.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 text-xs text-zinc-400">
              <span>High-resolution club photography included</span>
            </div>
          </div>

          {/* Card 5: Food & Beverages (Carefully handled for confirmed vs unconfirmed status) */}
          <div className="group relative overflow-hidden rounded-xl bg-[#101017] border border-white/10 hover:border-zinc-500 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                  <UtensilsCrossed className="w-4 h-4 text-[#ff7a18]" />
                  <span>05. Bar & Refreshments</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  {config.isFoodBeverageConfirmed ? 'Confirmed' : 'TBA · Details Pending'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display mb-3">
                Bar Menu & Culinary Specials
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {config.isFoodBeverageConfirmed
                  ? config.foodBeverageDetails
                  : 'Food and bar packages will be announced as soon as partner venue arrangements are locked. We do not advertise unconfirmed menu items.'}
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
              <span>Status: {config.isFoodBeverageConfirmed ? 'Announced' : 'Subject to venue announcement'}</span>
              <button
                onClick={onOpenOrganizer}
                className="text-zinc-500 hover:text-zinc-300 underline text-[11px] cursor-pointer"
              >
                Edit in settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
