import { Calendar, Clock, MapPin, Sparkles, ShieldCheck, Ticket, Download } from 'lucide-react';
import { EventConfig } from '../types';

interface EventInfoProps {
  config: EventConfig;
  onOpenOrganizer: () => void;
}

export default function EventInfoSection({ config, onOpenOrganizer }: EventInfoProps) {
  const downloadCalendarFile = () => {
    if (!config.isDateConfirmed) {
      alert('Event date is currently TBA. You can set the confirmed date in the Organizer Customizer or check back once announced!');
      return;
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//THE JAGER CLUB//Diwali Edition//EN
BEGIN:VEVENT
SUMMARY:THE JAGER CLUB: Desi Club Night — Diwali Edition
DESCRIPTION:Your Diwali. Your Rules. Desi beats. Neon lights. One unforgettable night.
LOCATION:${config.isVenueConfirmed ? config.venueName + ', ' + config.venueAddress : 'TBA'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'The_Jager_Club_Diwali_Edition.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const infoItems = [
    {
      icon: Calendar,
      label: 'Event Date',
      value: config.isDateConfirmed ? config.date : 'TBA — Details Coming Soon',
      isConfirmed: config.isDateConfirmed,
      color: '#ff5500',
      hint: config.isDateConfirmed ? 'Confirmed date' : 'Official date dropping shortly',
    },
    {
      icon: Clock,
      label: 'Start & End Time',
      value: config.isTimingsConfirmed ? config.timings : 'TBA — Night Party Hours',
      isConfirmed: config.isTimingsConfirmed,
      color: '#a855f7',
      hint: config.isTimingsConfirmed ? 'Doors open strictly on time' : 'Exact entry & curfew timings TBA',
    },
    {
      icon: MapPin,
      label: 'Venue & Location',
      value: config.isVenueConfirmed ? config.venueName : 'TBA — Prime Nightclub Venue',
      secondaryValue: config.isVenueConfirmed ? config.venueAddress : 'Exact address revealed to approved pass holders',
      isConfirmed: config.isVenueConfirmed,
      color: '#ec4899',
      hint: config.isVenueConfirmed ? 'Curated club venue' : 'Venue contract in finalization',
    },
    {
      icon: Sparkles,
      label: 'Dress Code',
      value: config.dressCode,
      isConfirmed: true,
      color: '#ff7a18',
      hint: 'Traditional festive fusion with modern club fits. Neon jewelry & UV accents encouraged.',
    },
    {
      icon: ShieldCheck,
      label: 'Age & Entry Requirements',
      value: config.entryAge,
      isConfirmed: true,
      color: '#10b981',
      hint: 'Physical original government ID (Passport, Driving License, or National ID) mandatory.',
    },
    {
      icon: Ticket,
      label: 'Pass Allocation & Price',
      value: config.isPriceConfirmed ? config.ticketPrice : 'TBA — Pass Requests Open Now',
      secondaryValue: `Intimate event strictly capped at ~${config.capacityLimit} guests`,
      isConfirmed: config.isPriceConfirmed,
      color: '#eab308',
      hint: config.isPriceConfirmed ? 'Official tier pricing' : 'Pricing announced prior to pass release',
    },
  ];

  return (
    <section id="event-details" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0c0c12] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff5500] mb-3">
              <span>Event Information</span>
              <span aria-hidden="true" className="text-zinc-700">·</span>
              <span className="text-zinc-400">Logistics & Rules</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display mb-3 [text-wrap:balance]">
              Know Before You Enter
            </h2>
            <p className="text-base text-zinc-400 max-w-xl">
              All confirmed logistics are verified below. Unconfirmed logistics are clearly labeled as TBA so you never encounter surprises.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadCalendarFile}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Add to Calendar</span>
            </button>
            <button
              onClick={onOpenOrganizer}
              className="text-xs text-zinc-400 hover:text-white underline decoration-zinc-600 underline-offset-4 cursor-pointer"
            >
              Edit Details
            </button>
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-xl p-6 sm:p-7 bg-[#12121c] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10"
                      style={{ color: item.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        item.isConfirmed
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-amber-400 bg-amber-500/10'
                      }`}
                    >
                      {item.isConfirmed ? 'Confirmed' : 'TBA · Pending'}
                    </span>
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                    {item.label}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                    {item.value}
                  </h3>

                  {item.secondaryValue && (
                    <p className="text-xs text-zinc-400 mb-3">{item.secondaryValue}</p>
                  )}
                </div>

                <div className="pt-4 border-t border-white/5 text-xs text-zinc-400 leading-relaxed">
                  {item.hint}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
