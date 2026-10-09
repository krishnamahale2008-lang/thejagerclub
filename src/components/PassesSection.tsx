import { useState, useId } from 'react';
import { Ticket, CheckCircle2, AlertCircle, Share2, Download, RefreshCw, User, Phone, Mail, Users, Info, QrCode } from 'lucide-react';
import { EventConfig, PassRegistration } from '../types';
import { registerPass, getRegistrations } from '../services/storage';

interface PassesSectionProps {
  config: EventConfig;
  onOpenOrganizer: () => void;
}

export default function PassesSection({ config, onOpenOrganizer }: PassesSectionProps) {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [passesCount, setPassesCount] = useState<number>(1);
  const [guestNotes, setGuestNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedPass, setConfirmedPass] = useState<PassRegistration | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Generate unique IDs for form accessibility
  const fullNameId = useId();
  const mobileId = useId();
  const emailId = useId();
  const guestNotesId = useId();

  // Current registration stats
  const allRegistrations = getRegistrations();
  const totalBooked = allRegistrations.reduce((acc, r) => acc + r.passesCount, 0);
  const isAtCapacity = totalBooked >= config.capacityLimit;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full legal name.';
    }

    const cleanMobile = mobile.replace(/[\s-+()]/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number with area code.';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address or leave blank.';
    }

    if (passesCount < 1 || passesCount > 4) {
      newErrors.passesCount = 'You can request between 1 and 4 passes per submission.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate standard asynchronous network latency to endpoint /api/register
    setTimeout(() => {
      const res = registerPass({
        fullName,
        mobile,
        email: email || undefined,
        passesCount,
        guestNames: guestNotes || undefined,
      });

      setIsSubmitting(false);

      if (res.success && res.pass) {
        setConfirmedPass(res.pass);
      } else {
        setSubmitError(res.message || 'Unable to complete pass request.');
      }
    }, 600);
  };

  const handleShareWhatsApp = () => {
    if (!confirmedPass) return;
    const text = encodeURIComponent(
      `Hey! I just submitted my pass request for THE JAGER CLUB: Desi Club Night — Diwali Edition (Pass Ref: ${confirmedPass.id}). Limited to ~100 guests!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handlePrintPass = () => {
    window.print();
  };

  const handleResetForm = () => {
    setConfirmedPass(null);
    setFullName('');
    setMobile('');
    setEmail('');
    setPassesCount(1);
    setGuestNotes('');
    setErrors({});
    setSubmitError(null);
  };

  return (
    <section id="passes" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#09090d] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff5500]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff5500] mb-3">
            <Ticket className="w-4 h-4" />
            <span>Passes & Access</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display mb-4 [text-wrap:balance]">
            Secure Your Invitation
          </h2>
          <p className="text-base text-zinc-400">
            Strictly limited to a curated guestlist of approximately {config.capacityLimit} attendees. Request your pass below for entry consideration.
          </p>
        </div>

        {/* Demo Mode Notice Box */}
        <div className="mb-8 p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-xs text-zinc-400 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-zinc-200">
              Registration System Transparency (Demo & Preview Mode)
            </div>
            <p>
              Registrations run with real local deduplication (one request per phone number) and strict capacity safeguards against the {config.capacityLimit}-guest limit. Once live database credentials are hooked up, entries sync automatically to the organizer portal.
            </p>
          </div>
        </div>

        {/* State 1: Confirmation Screen */}
        {confirmedPass ? (
          <div className="rounded-2xl p-6 sm:p-10 bg-[#101018] border border-[#ff5500]/40 shadow-2xl shadow-[#ff5500]/10 flex flex-col items-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#ff5500]/15 flex items-center justify-center text-[#ff5500] mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff7a18] mb-2">
              Pass Request Logged
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase font-display mb-2">
              {confirmedPass.fullName}
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mb-8">
              Your pass request has been recorded. In demo mode, a simulated entry token has been created for your party.
            </p>

            {/* Stylized Gen-Z Club Pass Card */}
            <div className="w-full max-w-md rounded-xl p-6 bg-gradient-to-b from-[#181824] to-[#0c0c12] border border-white/15 shadow-xl relative overflow-hidden mb-8 text-left">
              {/* Card top notch accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff5500] via-[#a855f7] to-[#ec4899]" />

              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#ff5500]">
                    THE JAGER CLUB
                  </div>
                  <div className="text-sm font-bold text-white font-display">
                    DESI CLUB NIGHT · DIWALI
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-semibold text-zinc-400">Ref Code</div>
                  <div className="font-mono text-sm font-bold text-white tracking-wider">
                    {confirmedPass.id}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Primary Guest</span>
                  <span className="font-semibold text-zinc-200">{confirmedPass.fullName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Passes Count</span>
                  <span className="font-semibold text-white font-mono">{confirmedPass.passesCount} Guest(s)</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Mobile Number</span>
                  <span className="font-semibold text-zinc-300 font-mono">{confirmedPass.mobile}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Admission Status</span>
                  <span className="font-semibold text-amber-400">Request Pending</span>
                </div>
              </div>

              {confirmedPass.guestNames && (
                <div className="pt-3 text-xs">
                  <span className="text-zinc-500 block text-[10px] uppercase">Accompanying Guests</span>
                  <span className="text-zinc-300 text-xs">{confirmedPass.guestNames}</span>
                </div>
              )}

              {/* QR Code and barcode simulation */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <QrCode className="w-10 h-10 text-white/80" />
                  <div className="text-[11px] text-zinc-400 leading-tight">
                    Present at door alongside government photo ID.
                  </div>
                </div>
                <div className="text-[10px] text-zinc-500 uppercase font-mono">
                  100 CAP STRICT
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handlePrintPass}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#ff5500]" />
                <span>Save / Print Pass</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Friends</span>
              </button>

              <button
                onClick={handleResetForm}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another Request</span>
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Registration Form */
          <div className="rounded-2xl p-6 sm:p-10 bg-[#101018] border border-white/10 shadow-2xl">
            {isAtCapacity ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold uppercase text-white font-display mb-2">
                  Capacity Reached
                </h3>
                <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
                  The planned {config.capacityLimit}-guest threshold has been filled. Contact the organizer on Instagram or WhatsApp for emergency waitlist spots.
                </p>
                <button
                  onClick={onOpenOrganizer}
                  className="px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  Organizer Mode: Adjust Capacity
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label htmlFor={fullNameId} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    <User className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    id={fullNameId}
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aryan Sehgal"
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-[#181824] border ${
                      errors.fullName ? 'border-red-500' : 'border-white/15 focus:border-[#ff5500]'
                    } text-white placeholder-zinc-500 text-sm outline-none transition-colors`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>
                  )}
                </div>

                {/* Mobile & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Mobile Number */}
                  <div>
                    <label htmlFor={mobileId} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                      <span>Mobile Number *</span>
                    </label>
                    <input
                      id={mobileId}
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      className={`w-full px-4 py-3 rounded-lg bg-[#181824] border ${
                        errors.mobile ? 'border-red-500' : 'border-white/15 focus:border-[#ff5500]'
                      } text-white placeholder-zinc-500 text-sm outline-none transition-colors font-mono`}
                    />
                    {errors.mobile ? (
                      <p className="mt-1.5 text-xs text-red-400">{errors.mobile}</p>
                    ) : (
                      <p className="mt-1 text-[11px] text-zinc-500">One submission per mobile number.</p>
                    )}
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label htmlFor={emailId} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      <Mail className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Email Address (Optional)</span>
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aryan@example.com"
                      className={`w-full px-4 py-3 rounded-lg bg-[#181824] border ${
                        errors.email ? 'border-red-500' : 'border-white/15 focus:border-[#ff5500]'
                      } text-white placeholder-zinc-500 text-sm outline-none transition-colors`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Number of Passes Requested (Configurable 1 to 4) */}
                <div>
                  <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    <span className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#ff5500]" />
                      <span>Number of Passes Requested *</span>
                    </span>
                    <span className="text-zinc-500 text-[11px]">Max 4 passes per request</span>
                  </label>

                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setPassesCount(count)}
                        className={`py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          passesCount === count
                            ? 'bg-[#ff5500] text-black shadow-lg shadow-[#ff5500]/25'
                            : 'bg-[#181824] text-zinc-300 hover:bg-[#202030] border border-white/10'
                        }`}
                      >
                        {count} {count === 1 ? 'Pass' : 'Passes'}
                      </button>
                    ))}
                  </div>
                  {errors.passesCount && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.passesCount}</p>
                  )}
                </div>

                {/* Additional Information / Guest Names */}
                <div>
                  <label htmlFor={guestNotesId} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    <span>Accompanying Guest Names / Special Notes</span>
                    <span className="text-zinc-500 text-[11px]">Optional</span>
                  </label>
                  <textarea
                    id={guestNotesId}
                    rows={2}
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    placeholder="If requesting 2+ passes, list the full names of accompanying guests..."
                    className="w-full px-4 py-3 rounded-lg bg-[#181824] border border-white/15 focus:border-[#ff5500] text-white placeholder-zinc-500 text-sm outline-none transition-colors resize-none"
                  />
                </div>

                {/* Terms Acceptance Note */}
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  By submitting, you confirm you meet the age requirement ({config.entryAge}) and agree to show valid government photo ID at entry. Right of admission is strictly reserved.
                </p>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-sm sm:text-base font-extrabold uppercase tracking-wider text-black bg-[#ff5500] hover:bg-[#ff6f26] active:scale-[0.99] transition-all rounded-md shadow-xl shadow-[#ff5500]/30 cursor-pointer disabled:opacity-50 whitespace-nowrap glow-orange"
                >
                  {isSubmitting ? 'Processing Pass Request...' : 'Submit Pass Request'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
