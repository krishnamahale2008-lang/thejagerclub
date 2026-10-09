export interface EventConfig {
  brandName: string;
  edition: string;
  tagline: string;
  supportingLine: string;
  date: string;
  isDateConfirmed: boolean;
  timings: string;
  isTimingsConfirmed: boolean;
  venueName: string;
  venueAddress: string;
  isVenueConfirmed: boolean;
  dressCode: string;
  entryAge: string;
  ticketPrice: string;
  isPriceConfirmed: boolean;
  capacityLimit: number;
  foodBeverageDetails: string;
  isFoodBeverageConfirmed: boolean;
  whatsappNumber: string;
  instagramHandle: string;
  email: string;
  djMusicNote: string;
}

export interface PassRegistration {
  id: string;
  fullName: string;
  mobile: string;
  email?: string;
  passesCount: number;
  guestNames?: string;
  createdAt: string;
  status: 'confirmed' | 'pending_review' | 'waitlist';
}

export interface RegistrationResult {
  success: boolean;
  message: string;
  pass?: PassRegistration;
  error?: string;
  isDemo: boolean;
}
