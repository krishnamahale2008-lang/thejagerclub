import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { EventConfig } from '../types';

interface FaqSectionProps {
  config: EventConfig;
}

export default function FaqSection({ config }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I register?',
      answer:
        'Submit the pass request form in the Passes section with your full name, active mobile number, and the number of passes needed (up to 4). Due to the intimate ~100 capacity cap, each request undergoes guestlist vetting.',
    },
    {
      question: 'Where will the event take place?',
      answer: config.isVenueConfirmed
        ? `The event will take place at ${config.venueName} (${config.venueAddress}).`
        : 'Details will be announced soon. The secret club location will be disclosed directly to confirmed pass holders prior to the night.',
    },
    {
      question: 'What is the dress code?',
      answer:
        config.dressCode +
        ' Fusion fits are celebrated — traditional kurtas paired with modern sneakers, chic festive drape dresses, and neon jewelry or UV-reactive touches.',
    },
    {
      question: 'What does my pass include?',
      answer: config.isPriceConfirmed
        ? `Each confirmed pass grants club entry, access to the main soundstage, live DJ sets, and official party photography. ${config.ticketPrice}`
        : 'Details will be announced soon. Pass inclusions, bar coupons, and final pricing will be communicated as soon as ticket tiers open.',
    },
    {
      question: 'What is the entry age requirement?',
      answer: `${config.entryAge}. Physical original government photo ID (Passport, Driving License, or National ID Card) is compulsory at door check-in. Digital phone screenshots will not be accepted.`,
    },
    {
      question: 'Who can I contact for assistance?',
      answer: `You can reach out directly to THE JAGER CLUB team via WhatsApp at ${config.whatsappNumber}, Instagram DM at ${config.instagramHandle}, or email at ${config.email}.`,
    },
  ];

  return (
    <section id="faqs" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0c0c12] border-t border-white/[0.06] relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff5500] mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display mb-4 [text-wrap:balance]">
            Everything You Need To Know
          </h2>
          <p className="text-base text-zinc-400">
            Clear answers on passes, admission, dress code, and club night policies.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-[#12121c] border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white font-display">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#ff5500]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
