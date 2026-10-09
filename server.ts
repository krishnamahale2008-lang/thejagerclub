import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory server store for registrations (can be hooked to Firestore or PostgreSQL)
interface PassRecord {
  id: string;
  fullName: string;
  mobile: string;
  email?: string;
  passesCount: number;
  guestNames?: string;
  createdAt: string;
  status: 'pending_review' | 'confirmed';
}

const SERVER_CONFIG = {
  capacityLimit: 100,
  brandName: 'THE JAGER CLUB',
  edition: 'Desi Club Night — Diwali Edition',
  isDateConfirmed: false,
  date: 'Details Coming Soon',
  isVenueConfirmed: false,
  venue: 'Details Coming Soon',
  isPriceConfirmed: false,
  price: 'Details Coming Soon',
};

const serverRegistrations: PassRecord[] = [
  {
    id: 'JGR-DWL-8491',
    fullName: 'Aman Sharma',
    mobile: '+91 98201 12345',
    email: 'aman.s@example.com',
    passesCount: 2,
    guestNames: 'Aman Sharma, Rhea Kapoor',
    createdAt: new Date().toISOString(),
    status: 'pending_review',
  },
];

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', event: 'THE JAGER CLUB: Desi Club Night — Diwali Edition' });
});

// Event Configuration
app.get('/api/event-config', (_req, res) => {
  res.json(SERVER_CONFIG);
});

// Pass stats and list
app.get('/api/passes', (_req, res) => {
  const totalAllocated = serverRegistrations.reduce((acc, r) => acc + r.passesCount, 0);
  res.json({
    totalAllocated,
    capacityLimit: SERVER_CONFIG.capacityLimit,
    remainingSpots: Math.max(0, SERVER_CONFIG.capacityLimit - totalAllocated),
    registrationsCount: serverRegistrations.length,
    isAtCapacity: totalAllocated >= SERVER_CONFIG.capacityLimit,
  });
});

// Secure Registration Endpoint with Duplicate Check & Capacity Guard
app.post('/api/register', (req, res) => {
  const { fullName, mobile, email, passesCount, guestNames } = req.body;

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({ error: 'Valid full legal name is required.' });
  }

  const cleanMobile = String(mobile || '').replace(/[\s-+()]/g, '');
  if (!cleanMobile || cleanMobile.length < 10) {
    return res.status(400).json({ error: 'Valid 10-digit mobile number is required.' });
  }

  const count = parseInt(passesCount, 10);
  if (isNaN(count) || count < 1 || count > 4) {
    return res.status(400).json({ error: 'Passes count must be between 1 and 4.' });
  }

  // 1. Server-side Duplicate Prevention
  const isDuplicate = serverRegistrations.some(
    (r) => r.mobile.replace(/[\s-+()]/g, '') === cleanMobile
  );
  if (isDuplicate) {
    return res.status(409).json({
      error: 'A pass request has already been registered with this mobile number. Duplicate submissions are not permitted.',
    });
  }

  // 2. Server-side Capacity Guard (100 cap)
  const currentTotal = serverRegistrations.reduce((acc, r) => acc + r.passesCount, 0);
  if (currentTotal + count > SERVER_CONFIG.capacityLimit) {
    return res.status(422).json({
      error: `Pass request exceeds the remaining capacity. Planned capacity is strictly ${SERVER_CONFIG.capacityLimit} guests.`,
    });
  }

  // 3. Issue Pass Record
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newRecord: PassRecord = {
    id: `JGR-DWL-${randomSuffix}`,
    fullName: fullName.trim(),
    mobile: String(mobile).trim(),
    email: email ? String(email).trim() : undefined,
    passesCount: count,
    guestNames: guestNames ? String(guestNames).trim() : undefined,
    createdAt: new Date().toISOString(),
    status: 'pending_review',
  };

  serverRegistrations.unshift(newRecord);

  res.status(201).json({
    success: true,
    message: 'Pass request registered successfully.',
    pass: newRecord,
    isDemo: true,
  });
});

// Serve production assets if built
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Only listen if executed directly
if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => {
    console.log(`THE JAGER CLUB server running on port ${PORT}`);
  });
}

export default app;
