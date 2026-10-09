import { useState, useId } from 'react';
import { X, Save, RotateCcw, Download, Trash2, Users, Sliders, CheckCircle2 } from 'lucide-react';
import { EventConfig, PassRegistration } from '../types';
import {
  saveEventConfig,
  resetEventConfig,
  getRegistrations,
  exportRegistrationsToCSV,
  clearDemoRegistrations,
} from '../services/storage';

interface OrganizerModalProps {
  config: EventConfig;
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: (newConfig: EventConfig) => void;
}

export default function OrganizerModal({
  config,
  isOpen,
  onClose,
  onConfigUpdated,
}: OrganizerModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'registrations'>('details');
  const [formData, setFormData] = useState<EventConfig>({ ...config });
  const [registrations, setRegistrations] = useState<PassRegistration[]>(getRegistrations());
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Generate unique IDs for form accessibility
  const dateInputId = useId();
  const timingsInputId = useId();
  const venueNameInputId = useId();
  const venueAddressInputId = useId();
  const ticketPriceInputId = useId();
  const capacityLimitInputId = useId();
  const dressCodeInputId = useId();
  const entryAgeInputId = useId();
  const whatsappInputId = useId();
  const instagramInputId = useId();
  const emailInputId = useId();
  const foodBeverageInputId = useId();
  const djMusicNoteInputId = useId();

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveEventConfig(formData);
    onConfigUpdated(formData);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  const handleResetDefaults = () => {
    if (confirm('Reset event details back to initial unconfirmed template?')) {
      const reset = resetEventConfig();
      setFormData(reset);
      onConfigUpdated(reset);
    }
  };

  const handleExportCSV = () => {
    const csv = exportRegistrationsToCSV();
    if (!csv) {
      alert('No registrations recorded yet to export.');
      return;
    }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `jager_club_diwali_passes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearRegistrations = () => {
    if (confirm('Clear all demo pass registrations? This will reset booked spots to 0.')) {
      clearDemoRegistrations();
      setRegistrations([]);
    }
  };

  const totalBooked = registrations.reduce((acc, r) => acc + r.passesCount, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#101018] border border-white/15 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#141420]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff5500]">
                Event Management
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs text-zinc-400">Live Customizer</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-display">
              Organizer Controls
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {saveSuccessNotice && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved live!</span>
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-white/10 px-6 bg-[#0e0e16] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'details'
                ? 'border-[#ff5500] text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sliders className="w-4 h-4 text-[#ff5500]" />
            <span>Event Logistics & Contacts</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('registrations');
              setRegistrations(getRegistrations());
            }}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'registrations'
                ? 'border-[#ff5500] text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="w-4 h-4 text-[#a855f7]" />
            <span>
              Pass Requests ({registrations.length} · {totalBooked}/{formData.capacityLimit} passes)
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'details' ? (
            <form onSubmit={handleSave} className="space-y-6">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Update date, venue, timings, pricing, and contact handles. When an item is marked as unconfirmed, the website automatically surfaces <strong>"Details Coming Soon" / "TBA"</strong> to prevent misleading attendees.
              </p>

              {/* 1. Date & Timings */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Event Schedule
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor={dateInputId} className="text-xs text-zinc-300 font-medium">Event Date</label>
                      <label className="flex items-center gap-1.5 text-[11px] text-zinc-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isDateConfirmed}
                          onChange={(e) =>
                            setFormData({ ...formData, isDateConfirmed: e.target.checked })
                          }
                          className="rounded text-[#ff5500]"
                        />
                        <span>Confirmed</span>
                      </label>
                    </div>
                    <input
                      id={dateInputId}
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g. Friday, October 30, 2026"
                      className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor={timingsInputId} className="text-xs text-zinc-300 font-medium">Timings</label>
                      <label className="flex items-center gap-1.5 text-[11px] text-zinc-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isTimingsConfirmed}
                          onChange={(e) =>
                            setFormData({ ...formData, isTimingsConfirmed: e.target.checked })
                          }
                          className="rounded text-[#ff5500]"
                        />
                        <span>Confirmed</span>
                      </label>
                    </div>
                    <input
                      id={timingsInputId}
                      type="text"
                      value={formData.timings}
                      onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                      placeholder="e.g. 10:00 PM – 4:00 AM"
                      className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Venue */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Venue & Location
                  </h4>
                  <label className="flex items-center gap-1.5 text-[11px] text-zinc-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isVenueConfirmed}
                      onChange={(e) =>
                        setFormData({ ...formData, isVenueConfirmed: e.target.checked })
                      }
                      className="rounded text-[#ff5500]"
                    />
                    <span>Venue Confirmed</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={venueNameInputId} className="text-xs text-zinc-300 block mb-1">Venue Name</label>
                    <input
                      id={venueNameInputId}
                      type="text"
                      value={formData.venueName}
                      onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                      placeholder="e.g. Club Mirage / TBA"
                      className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500]"
                    />
                  </div>
                  <div>
                    <label htmlFor={venueAddressInputId} className="text-xs text-zinc-300 block mb-1">Address / Landmark</label>
                    <input
                      id={venueAddressInputId}
                      type="text"
                      value={formData.venueAddress}
                      onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                      placeholder="e.g. South Extension / To be disclosed"
                      className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Pricing & Capacity Limit */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Pricing & Capacity
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor={ticketPriceInputId} className="text-xs text-zinc-300 font-medium">Ticket Price</label>
                      <label className="flex items-center gap-1.5 text-[11px] text-zinc-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isPriceConfirmed}
                          onChange={(e) =>
                            setFormData({ ...formData, isPriceConfirmed: e.target.checked })
                          }
                          className="rounded text-[#ff5500]"
                        />
                        <span>Confirmed</span>
                      </label>
                    </div>
                    <input
                      id={ticketPriceInputId}
                      type="text"
                      value={formData.ticketPrice}
                      onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                      placeholder="e.g. ₹2,500 Cover Charge / TBA"
                      className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500]"
                    />
                  </div>

                  <div>
                    <label htmlFor={capacityLimitInputId} className="text-xs text-zinc-300 block mb-1.5">
                      Guest Capacity Limit (Planned ~90-100)
                    </label>
                    <input
                      id={capacityLimitInputId}
                      type="number"
                      min={10}
                      max={500}
                      value={formData.capacityLimit}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          capacityLimit: parseInt(e.target.value) || 100,
                        })
                      }
                      className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500] font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Age & Dress Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={dressCodeInputId} className="text-xs text-zinc-300 block mb-1">Dress Code</label>
                  <input
                    id={dressCodeInputId}
                    type="text"
                    value={formData.dressCode}
                    onChange={(e) => setFormData({ ...formData, dressCode: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label htmlFor={entryAgeInputId} className="text-xs text-zinc-300 block mb-1">Age Requirement</label>
                  <input
                    id={entryAgeInputId}
                    type="text"
                    value={formData.entryAge}
                    onChange={(e) => setFormData({ ...formData, entryAge: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>

              {/* 5. Contact Channels */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Organizer Contact Handles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor={whatsappInputId} className="text-xs text-zinc-300 block mb-1">WhatsApp Number</label>
                    <input
                      id={whatsappInputId}
                      type="text"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500] font-mono"
                    />
                  </div>
                  <div>
                    <label htmlFor={instagramInputId} className="text-xs text-zinc-300 block mb-1">Instagram Handle</label>
                    <input
                      id={instagramInputId}
                      type="text"
                      value={formData.instagramHandle}
                      onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                      placeholder="@thejagerclub"
                      className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500]"
                    />
                  </div>
                  <div>
                    <label htmlFor={emailInputId} className="text-xs text-zinc-300 block mb-1">Contact Email</label>
                    <input
                      id={emailInputId}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="access@thejagerclub.com"
                      className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500]"
                    />
                  </div>
                </div>
              </div>

              {/* 6. Food & Beverage Note */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={foodBeverageInputId} className="text-xs font-bold uppercase tracking-wider text-white">
                    Food & Bar Notes
                  </label>
                  <label className="flex items-center gap-1.5 text-[11px] text-zinc-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFoodBeverageConfirmed}
                      onChange={(e) =>
                        setFormData({ ...formData, isFoodBeverageConfirmed: e.target.checked })
                      }
                      className="rounded text-[#ff5500]"
                    />
                    <span>Confirmed Inclusions</span>
                  </label>
                </div>
                <textarea
                  id={foodBeverageInputId}
                  rows={2}
                  value={formData.foodBeverageDetails}
                  onChange={(e) => setFormData({ ...formData, foodBeverageDetails: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500] resize-none"
                />
              </div>

              {/* DJ Music Lineup Note */}
              <div>
                <label htmlFor={djMusicNoteInputId} className="text-xs text-zinc-300 block mb-1">DJ Sound & Style Curation</label>
                <input
                  id={djMusicNoteInputId}
                  type="text"
                  value={formData.djMusicNote}
                  onChange={(e) => setFormData({ ...formData, djMusicNote: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#181824] border border-white/15 text-white text-xs outline-none focus:border-[#ff5500]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Initial Unconfirmed Defaults</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#ff5500] hover:bg-[#ff6f26] text-black font-bold uppercase text-xs cursor-pointer shadow-lg shadow-[#ff5500]/25"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes Live</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Registrations list tab */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div>
                  <div className="text-xs font-bold uppercase text-white mb-0.5">
                    Live Demo Guestlist ({registrations.length} submissions)
                  </div>
                  <div className="text-xs text-zinc-400 font-mono">
                    Total passes allocated: <span className="text-white font-bold">{totalBooked}</span> / {formData.capacityLimit} max
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={handleClearRegistrations}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-500/15 hover:bg-red-500/25 text-red-300 text-xs font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Submissions</span>
                  </button>
                </div>
              </div>

              {registrations.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 text-xs">
                  No pass requests recorded yet. Submissions made from the Passes form appear here automatically.
                </div>
              ) : (
                <div className="border border-white/10 rounded-xl overflow-x-auto bg-[#141420]">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-[#181826] text-[10px] uppercase font-bold text-zinc-400 tracking-wider border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Ref Code</th>
                        <th className="py-3 px-4">Guest Name</th>
                        <th className="py-3 px-4">Mobile</th>
                        <th className="py-3 px-4">Passes</th>
                        <th className="py-3 px-4">Accompanying Guests</th>
                        <th className="py-3 px-4">Submitted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {registrations.map((r) => (
                        <tr key={r.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap">
                            {r.id}
                          </td>
                          <td className="py-3 px-4 font-semibold text-zinc-200">
                            {r.fullName}
                          </td>
                          <td className="py-3 px-4 font-mono text-zinc-400 whitespace-nowrap">
                            {r.mobile}
                          </td>
                          <td className="py-3 px-4 font-mono text-[#ff5500] font-bold">
                            {r.passesCount}
                          </td>
                          <td className="py-3 px-4 text-zinc-400 max-w-xs truncate">
                            {r.guestNames || '—'}
                          </td>
                          <td className="py-3 px-4 text-zinc-500 whitespace-nowrap font-mono text-[11px]">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
