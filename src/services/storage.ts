import { EventConfig, PassRegistration, RegistrationResult } from '../types';

const CONFIG_STORAGE_KEY = 'the_jager_club_event_config_v1';
const REGISTRATIONS_STORAGE_KEY = 'the_jager_club_registrations_v1';

export const DEFAULT_CONFIG: EventConfig = {
  brandName: 'THE JAGER CLUB',
  edition: 'Desi Club Night — Diwali Edition',
  tagline: 'Your Diwali. Your Rules.',
  supportingLine: 'Desi beats. Neon lights. One unforgettable night.',
  // Unconfirmed fields default to Details Coming Soon / TBA
  date: 'Details Coming Soon',
  isDateConfirmed: false,
  timings: 'Details Coming Soon',
  isTimingsConfirmed: false,
  venueName: 'Details Coming Soon',
  venueAddress: 'Prime Nightlife District (Revealed to Pass Holders)',
  isVenueConfirmed: false,
  dressCode: 'Modern Desi Chic / Club Glam (Neon Accents Encouraged)',
  entryAge: 'Strictly 21+ (Government Photo ID Mandatory)',
  ticketPrice: 'Details Coming Soon',
  isPriceConfirmed: false,
  capacityLimit: 100, // Capped at 90-100 guests as specified
  foodBeverageDetails: 'Bar and festive food specials to be announced upon venue confirmation.',
  isFoodBeverageConfirmed: false,
  whatsappNumber: '+91 98765 43210',
  instagramHandle: '@thejagerclub',
  email: 'access@thejagerclub.com',
  djMusicNote: 'Resident & Guest DJs spinning Punjabi Club, Tech-Bollywood & Global Desi Bass',
};

// Initial realistic demo registrations to showcase capacity state without faking fake counters
const INITIAL_DEMO_REGISTRATIONS: PassRegistration[] = [
  {
    id: 'JGR-DWL-8491',
    fullName: 'Aman Sharma',
    mobile: '+91 98201 12345',
    email: 'aman.s@example.com',
    passesCount: 2,
    guestNames: 'Aman Sharma, Rhea Kapoor',
    createdAt: '2026-10-08T18:30:00Z',
    status: 'pending_review',
  },
  {
    id: 'JGR-DWL-8492',
    fullName: 'Simran Khurana',
    mobile: '+91 98112 54321',
    email: 'simran.k@example.com',
    passesCount: 3,
    guestNames: 'Simran Khurana, Tanya M., Kabir S.',
    createdAt: '2026-10-09T09:15:00Z',
    status: 'pending_review',
  },
];

export function getEventConfig(): EventConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveEventConfig(config: EventConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save event config', e);
  }
}

export function resetEventConfig(): EventConfig {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
  }
  return DEFAULT_CONFIG;
}

export function getRegistrations(): PassRegistration[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REGISTRATIONS));
      return INITIAL_DEMO_REGISTRATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveRegistrations(regs: PassRegistration[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(regs));
  } catch (e) {
    console.error('Failed to save registrations', e);
  }
}

export function registerPass(input: {
  fullName: string;
  mobile: string;
  email?: string;
  passesCount: number;
  guestNames?: string;
}): RegistrationResult {
  const current = getRegistrations();
  const config = getEventConfig();

  // Normalize mobile for duplicate check
  const cleanMobile = input.mobile.replace(/[\s-]/g, '');

  // 1. Duplicate check by mobile number
  const exists = current.some((r) => r.mobile.replace(/[\s-]/g, '') === cleanMobile);
  if (exists) {
    return {
      success: false,
      message: 'A pass request has already been registered with this mobile number. Each mobile number can only submit one pass request.',
      error: 'DUPLICATE_MOBILE',
      isDemo: true,
    };
  }

  // 2. Capacity check
  const totalBooked = current.reduce((sum, r) => sum + r.passesCount, 0);
  if (totalBooked + input.passesCount > config.capacityLimit) {
    return {
      success: false,
      message: `Pass request exceeds the remaining capacity limit of ${config.capacityLimit - totalBooked} passes. Planned capacity is strictly ${config.capacityLimit} guests.`,
      error: 'CAPACITY_EXCEEDED',
      isDemo: true,
    };
  }

  // 3. Create pass record
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newPass: PassRegistration = {
    id: `JGR-DWL-${randomSuffix}`,
    fullName: input.fullName.trim(),
    mobile: input.mobile.trim(),
    email: input.email?.trim() || undefined,
    passesCount: input.passesCount,
    guestNames: input.guestNames?.trim() || undefined,
    createdAt: new Date().toISOString(),
    status: 'pending_review',
  };

  const updated = [newPass, ...current];
  saveRegistrations(updated);

  return {
    success: true,
    message: 'Pass request submitted successfully! In demo mode, your pass reference has been generated and recorded locally.',
    pass: newPass,
    isDemo: true,
  };
}

export function exportRegistrationsToCSV(): string {
  const regs = getRegistrations();
  if (regs.length === 0) return '';
  const headers = ['Pass ID', 'Full Name', 'Mobile', 'Email', 'Passes Count', 'Guest Names', 'Status', 'Submitted At'];
  const rows = regs.map((r) => [
    r.id,
    `"${r.fullName.replace(/"/g, '""')}"`,
    `"${r.mobile}"`,
    `"${r.email || ''}"`,
    r.passesCount,
    `"${(r.guestNames || '').replace(/"/g, '""')}"`,
    r.status,
    r.createdAt,
  ]);
  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

export function clearDemoRegistrations(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify([]));
  }
}
