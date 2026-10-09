import { useState } from 'react';
import { ArrowDown, Calendar, Clock, MapPin, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { EventConfig } from '../types';
import FestiveEmbersCanvas from './FestiveEmbersCanvas';

interface HeroProps {
  config: EventConfig;
  onOpenOrganizer: () => void;
}

export default function Hero({ config, onOpenOrganizer }: HeroProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Web Audio atmospheric club groove preview
  const toggleAmbientGroove = () => {
    if (isPlayingAudio) {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsPlayingAudio(false);
      return;
    }

    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      setAudioCtx(ctx);
      setIsPlayingAudio(true);

      // Simple tasteful 4-beat sub-bass pulse & festive tabla harmonic resonance
      const tempo = 124;
      const beatInterval = 60 / tempo;
      let step = 0;

      const scheduleBeat = () => {
        if (ctx.state === 'closed') return;
        const now = ctx.currentTime;

        // Sub kick pulse
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(step % 4 === 0 ? 95 : 65, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.18);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);

        // Hi-hat / shaker shimmer on offbeats
        if (step % 2 === 1) {
          const hatGain = ctx.createGain();
          hatGain.gain.setValueAtTime(0.04, now);
          hatGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

          const bufferSize = ctx.sampleRate * 0.05;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.connect(hatGain);
          hatGain.connect(ctx.destination);
          whiteNoise.start(now);
        }

        step = (step + 1) % 16;
      };

      const timerId = setInterval(scheduleBeat, (beatInterval / 2) * 1000);

      // Auto stop after 25 seconds to be courteous
      setTimeout(() => {
        clearInterval(timerId);
        if (ctx.state !== 'closed') {
          ctx.close();
          setAudioCtx(null);
          setIsPlayingAudio(false);
        }
      }, 25000);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const scrollToRegistration = () => {
    const el = document.getElementById('passes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToExperience = () => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#08080b]">
      {/* Background Image with Measured Nightlife Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_desi_club_diwali_1791578048184.jpg"
          alt="The Jager Club Diwali Nightlife Experience"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-fade-in"
        />
        {/* Deep cinematic overlays for 100% WCAG contrast and moody Gen-Z neon palette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-[#08080b]/80 to-[#08080b]/50" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#ff5500]/10 via-transparent to-transparent" />
      </div>

      {/* Ambient festive sparks and particles */}
      <FestiveEmbersCanvas />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto w-full my-auto text-center flex flex-col items-center">
        {/* Brand Kicker */}
        <div className="flex items-center justify-center gap-2 mb-4 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#ff7a18]">
          <span>{config.brandName}</span>
          <span aria-hidden="true" className="text-zinc-600">/</span>
          <span className="text-[#f4f4f7]">{config.edition}</span>
        </div>

        {/* Marquee Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-display leading-[0.95] mb-6 drop-shadow-xl max-w-4xl [text-wrap:balance]">
          Your Diwali.{' '}
          <span className="text-gradient-fire drop-shadow-[0_0_35px_rgba(255,85,0,0.5)]">
            Your Rules.
          </span>
        </h1>

        {/* Supporting Line */}
        <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mx-auto mb-8 sm:mb-10 [text-wrap:balance]">
          {config.supportingLine}
        </p>

        {/* Key Event Badges (Clean unboxed editorial text, not rounded candy pills) */}
        <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-8 text-xs sm:text-sm font-medium text-zinc-300 mb-10 py-3 px-5 sm:px-8 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#ff5500] shrink-0" />
            <span className="text-white font-semibold">Date:</span>
            <span>{config.isDateConfirmed ? config.date : 'Details Coming Soon'}</span>
          </div>
          <span aria-hidden="true" className="text-zinc-600 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#a855f7] shrink-0" />
            <span className="text-white font-semibold">Timings:</span>
            <span>{config.isTimingsConfirmed ? config.timings : 'Details Coming Soon'}</span>
          </div>
          <span aria-hidden="true" className="text-zinc-600 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#ec4899] shrink-0" />
            <span className="text-white font-semibold">Venue:</span>
            <span>{config.isVenueConfirmed ? config.venueName : 'Details Coming Soon'}</span>
          </div>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={scrollToRegistration}
            className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-extrabold uppercase tracking-wider text-black bg-[#ff5500] hover:bg-[#ff6f26] active:scale-[0.98] transition-all rounded-md shadow-2xl shadow-[#ff5500]/40 cursor-pointer whitespace-nowrap glow-orange"
          >
            Get Your Pass
          </button>
          
          <button
            onClick={scrollToExperience}
            className="w-full sm:w-auto px-7 py-4 text-sm sm:text-base font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 active:scale-[0.98] transition-all rounded-md backdrop-blur-sm cursor-pointer whitespace-nowrap"
          >
            Explore The Experience
          </button>
        </div>

        {/* Ambient Beat Sound Preview & Organizer Notice */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
          <button
            onClick={toggleAmbientGroove}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors cursor-pointer"
            title="Preview ambient club rhythm"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#ff5500] animate-pulse" />
                <span>Mute Club Vibe</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>Hear The Vibe Preview</span>
              </>
            )}
          </button>

          <span aria-hidden="true" className="text-zinc-700">·</span>

          <span className="inline-flex items-center gap-1.5 text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
            <span>Strictly Capped ~100 Guests</span>
          </span>

          <span aria-hidden="true" className="text-zinc-700">·</span>

          <button
            onClick={onOpenOrganizer}
            className="text-zinc-400 hover:text-white underline decoration-zinc-600 underline-offset-4 cursor-pointer"
          >
            Organizer Customizer
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-20 flex justify-center pt-6">
        <button
          onClick={scrollToExperience}
          className="text-zinc-500 hover:text-white transition-colors flex flex-col items-center gap-1 cursor-pointer text-xs uppercase tracking-widest font-semibold"
          aria-label="Scroll to experience"
        >
          <span>Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#ff5500]" />
        </button>
      </div>
    </section>
  );
}
