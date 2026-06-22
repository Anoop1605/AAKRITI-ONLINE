export type EventCategory = 'sports' | 'cultural' | 'management';

export interface Event {
  id: string;
  name: string;
  category: EventCategory;
  districtName: string;      // The cinematic "place" name
  districtTheme: string;     // CSS class for background scene
  tagline: string;           // 3–4 words, dramatic
  description: string;
  teamSize: string;
  duration: string;
  icon: string;              // Lucide icon name
  isPlaceholder?: boolean;   // Flags a reserved placeholder slot
  rules: string[];           // List of rules for this district
  venue: string;             // Venue details
  time: string;              // Time of the event
  fee: string;               // Registration fee
}

export const events: Event[] = [
  // ── SPORTS ──────────────────────────────────────────
  {
    id: 'sp-01', name: 'Throwball', category: 'sports',
    districtName: 'Stone Breathing District',
    districtTheme: 'card-stone',
    tagline: 'Strength. Speed. Precision.',
    description: 'Fast-paced battle of reflexes and raw throwing power.',
    teamSize: '9v9', duration: '45 min', icon: 'Circle',
    rules: ['Knockout format', 'Standard referee decisions are final', 'ID cards mandatory'],
    venue: 'Main Ground, Castle Courtyard',
    time: 'Day 1, 10:00 AM',
    fee: '₹300 per team'
  },
  {
    id: 'sp-02', name: 'Volleyball', category: 'sports',
    districtName: 'Wind Breathing District',
    districtTheme: 'card-wind',
    tagline: 'Rise. Spike. Conquer.',
    description: 'Six warriors per side. One court. Endless sky.',
    teamSize: '6v6', duration: '60 min', icon: 'ArrowUp',
    rules: ['Standard 6v6 rotation rules', 'Best of 3 sets match', 'Net touch is a foul'],
    venue: 'Outdoor Court, Wind Pagoda',
    time: 'Day 1, 11:30 AM',
    fee: '₹300 per team'
  },
  {
    id: 'sp-03', name: 'Carrom', category: 'sports',
    districtName: 'Shadow Breathing District',
    districtTheme: 'card-shadow',
    tagline: 'Precision. Silence. Victory.',
    description: 'In the quiet chamber, only focus survives.',
    teamSize: '1v1 / 2v2', duration: '30 min', icon: 'Target',
    rules: ['Singles/Doubles tournament format', 'White pocket is 10pts, Black is 5pts', 'Queen must be covered'],
    venue: 'Indoor Board Room, Shadow Chamber',
    time: 'Day 1, 01:00 PM',
    fee: '₹100 per player'
  },
  {
    id: 'sp-04', name: 'Table Tennis', category: 'sports',
    districtName: 'Thunder Breathing District',
    districtTheme: 'card-thunder',
    tagline: 'Strike. Faster.',
    description: 'Lightning reflexes. Millisecond decisions.',
    teamSize: '1v1', duration: '20 min', icon: 'Zap',
    rules: ['Best of 5 games', '11 points per game', 'ITTF service rules apply'],
    venue: 'TT Hall, West Wing',
    time: 'Day 1, 02:30 PM',
    fee: '₹150 per player'
  },
  {
    id: 'sp-05', name: 'Powerlifting', category: 'sports',
    districtName: 'Iron Breathing District',
    districtTheme: 'card-iron',
    tagline: 'Forge. Break. Surpass.',
    description: 'Test the absolute limits of raw human strength.',
    teamSize: 'Solo', duration: '45 min', icon: 'Dumbbell',
    rules: ['Three attempts per lift', 'Squat, Bench, and Deadlift total weight wins', 'Lifting gears allowed'],
    venue: 'Castle Gymnasium, Iron Forge',
    time: 'Day 2, 09:30 AM',
    fee: '₹200 per player'
  },
  {
    id: 'sp-06', name: 'Squats Challenge', category: 'sports',
    districtName: 'Earth Breathing District',
    districtTheme: 'card-earth',
    tagline: 'One more. Always one more.',
    description: 'Max reps. Max will. Who breaks first?',
    teamSize: 'Solo', duration: '15 min', icon: 'TrendingDown',
    rules: ['Time limit of 2 minutes', 'Proper depth is mandatory per rep', 'No resting at the top of motion'],
    venue: 'Temple Grounds, Stone Pillars',
    time: 'Day 2, 11:00 AM',
    fee: '₹100 per player'
  },

  // ── CULTURAL ────────────────────────────────────────
  {
    id: 'cu-01', name: 'Fashion Show', category: 'cultural',
    districtName: 'District of Elegance',
    districtTheme: 'card-elegance',
    tagline: 'Walk. Own. Reign.',
    description: 'The crimson runway awaits. Own every step.',
    teamSize: '5–10', duration: '90 min', icon: 'Sparkles',
    rules: ['Theme: Traditional / Oriental Fusion', 'Time limit of 8 minutes per team', 'Props allowed (advance approval needed)'],
    venue: 'Main Auditorium Stage',
    time: 'Day 2, 03:00 PM',
    fee: '₹800 per team'
  },
  {
    id: 'cu-02', name: 'Duet Dance', category: 'cultural',
    districtName: 'Moonlight Courtyard',
    districtTheme: 'card-moonlight',
    tagline: 'Two souls. One rhythm.',
    description: 'Under the full moon, synchrony becomes art.',
    teamSize: '2', duration: '5 min', icon: 'Music',
    rules: ['Time limit: 4 to 5 minutes', 'Any dance style permitted', 'Audio track to be submitted in USB'],
    venue: 'Moonlight Courtyard Amphitheatre',
    time: 'Day 1, 04:00 PM',
    fee: '₹300 per team'
  },
  {
    id: 'cu-03', name: 'Group Dance', category: 'cultural',
    districtName: 'Performance Plaza',
    districtTheme: 'card-plaza',
    tagline: 'Many voices. One thunder.',
    description: 'The stage belongs to those who command it.',
    teamSize: '6–15', duration: '8 min', icon: 'Radio',
    rules: ['Team size: 6 to 15 members', 'Time limit: 8 minutes max', 'No props that damage the stage floors'],
    venue: 'Festival Plaza Main Stage',
    time: 'Day 2, 01:30 PM',
    fee: '₹600 per team'
  },
  {
    id: 'cu-04', name: 'Treasure Hunt', category: 'cultural',
    districtName: 'The Hidden Path',
    districtTheme: 'card-path',
    tagline: 'Seek. Decode. Triumph.',
    description: 'Clues hidden across campus. Race your rivals.',
    teamSize: '3–5', duration: '120 min', icon: 'Map',
    rules: ['Team size: 3-5 members', 'Clues hidden across entire campus grounds', 'No physical force or damage to props'],
    venue: 'Castle Gates (Starting Point)',
    time: 'Day 1, 10:30 AM',
    fee: '₹250 per team'
  },
  {
    id: 'cu-05', name: 'Short Film', category: 'cultural',
    districtName: 'Chronicles Studio',
    districtTheme: 'card-studio',
    tagline: 'Tell it. In 10 minutes.',
    description: 'A story told in under 10 minutes. Make it unforgettable.',
    teamSize: '2–8', duration: 'Submit 72h prior', icon: 'Film',
    rules: ['Time limit: Under 10 minutes', 'Submission via Google Drive link 72h prior', 'Original cinematography and content only'],
    venue: 'Chronicles Studio Seminar Hall',
    time: 'Day 2, 11:30 AM',
    fee: '₹200 per film'
  },
  {
    id: 'cu-06', name: 'BGMI Online', category: 'cultural',
    districtName: 'The Gaming Realm',
    districtTheme: 'card-gaming',
    tagline: 'Squad. Strategy. Survive.',
    description: 'The battlefield is digital. The glory is real.',
    teamSize: '4', duration: '2 matches', icon: 'Gamepad2',
    rules: ['Squad mode TPP format', 'No emulator, hacks, or physical triggers allowed', 'Official maps used: Erangel & Miramar'],
    venue: 'The Gaming Realm (Discord Live)',
    time: 'Day 1, 07:00 PM',
    fee: '₹200 per team'
  },

  // ── MANAGEMENT ──────────────────────────────────────
  {
    id: 'mg-01', name: 'Business Quiz', category: 'management',
    districtName: 'The Council Chamber',
    districtTheme: 'card-council',
    tagline: 'Know. React. Win.',
    description: 'Market trends, strategy, trivia — all tested.',
    teamSize: '2', duration: '60 min', icon: 'BrainCircuit',
    rules: ['Team size: 2 members', 'Written prelims round followed by stage finals', 'Mobile phone usage leads to instant DQ'],
    venue: 'Chamber Auditorium',
    time: 'Day 1, 11:00 AM',
    fee: '₹200 per team'
  },
  {
    id: 'mg-02', name: 'Ads Creation', category: 'management',
    districtName: 'The Market Quarter',
    districtTheme: 'card-market',
    tagline: 'Sell the unsellable.',
    description: 'Creativity meets commerce. Make them believe.',
    teamSize: '2–4', duration: '90 min', icon: 'Megaphone',
    rules: ['Preparation time: 60 minutes', 'Presentation time: 3 minutes', 'Topics will be given on the spot'],
    venue: 'Market Quarter Seminar Hall',
    time: 'Day 1, 02:00 PM',
    fee: '₹200 per team'
  },
  {
    id: 'mg-03', name: 'Mock Interview', category: 'management',
    districtName: 'The Dojo of Words',
    districtTheme: 'card-dojo',
    tagline: 'Face the panel. Hold ground.',
    description: 'The spotlight is yours. Defend your worth.',
    teamSize: 'Solo', duration: '20 min/slot', icon: 'UserCheck',
    rules: ['Solo entry only', 'Aptitude test followed by board panel interview', 'Formal dress code is mandatory'],
    venue: 'Dojo Boardroom',
    time: 'Day 2, 10:00 AM',
    fee: '₹150 per player'
  },
  {
    id: 'mg-04', name: 'Finance Quantum', category: 'management',
    districtName: 'The Treasury Vault',
    districtTheme: 'card-vault',
    tagline: 'Numbers are power.',
    description: 'Financial warfare through strategy and calculation.',
    teamSize: '2', duration: '75 min', icon: 'BarChart2',
    rules: ['Team size: 2 members', 'Analytical case study and spreadsheet round', 'Calculators are permitted'],
    venue: 'Treasury Vault Computer Lab',
    time: 'Day 2, 12:00 PM',
    fee: '₹200 per team'
  },
  {
    id: 'mg-05', name: 'Startup Stall', category: 'management',
    districtName: 'The Innovation Quarter',
    districtTheme: 'card-innovation',
    tagline: 'Build. Pitch. Conquer.',
    description: 'Pitch your idea. Win the market. Claim the quarter.',
    teamSize: '2–5', duration: 'Full day', icon: 'Lightbulb',
    rules: ['Space provided: 6x6 feet stall', 'Must present a working prototype or pitch deck', 'Judging on feasibility and sales'],
    venue: 'Innovation Quarter Courtyard Stalls',
    time: 'Day 1, Full Day',
    fee: '₹400 per stall'
  },

  // ── RESERVED SLOTS ──────────────────────────────────
  {
    id: 'ph-01', name: '[EVENT NAME]', category: 'sports',
    districtName: 'The Forgotten District',
    districtTheme: 'card-placeholder-1',
    tagline: '[To be written]',
    description: 'A mysterious realm yet to be unveiled. Keep watch.',
    teamSize: '[TEAM]', duration: '[DURATION]', icon: 'HelpCircle',
    isPlaceholder: true,
    rules: [],
    venue: 'TBD',
    time: 'TBD',
    fee: 'TBD'
  },
  {
    id: 'ph-02', name: '[EVENT NAME]', category: 'cultural',
    districtName: 'The Forgotten District',
    districtTheme: 'card-placeholder-2',
    tagline: '[To be written]',
    description: 'A mysterious realm yet to be unveiled. Keep watch.',
    teamSize: '[TEAM]', duration: '[DURATION]', icon: 'HelpCircle',
    isPlaceholder: true,
    rules: [],
    venue: 'TBD',
    time: 'TBD',
    fee: 'TBD'
  },
  {
    id: 'ph-03', name: '[EVENT NAME]', category: 'management',
    districtName: 'The Forgotten District',
    districtTheme: 'card-placeholder-3',
    tagline: '[To be written]',
    description: 'A mysterious realm yet to be unveiled. Keep watch.',
    teamSize: '[TEAM]', duration: '[DURATION]', icon: 'HelpCircle',
    isPlaceholder: true,
    rules: [],
    venue: 'TBD',
    time: 'TBD',
    fee: 'TBD'
  }
];

// Category metadata
export const categories = {
  sports: {
    title: 'The Breathing Districts',
    subtitle: 'Where Strength Meets Honour',
    count: 6,
    theme: 'stone',
    color: '#D4A054'
  },
  cultural: {
    title: 'The Festival Realms',
    subtitle: 'Where Art Becomes Legend',
    count: 6,
    theme: 'crimson',
    color: '#C0392B'
  },
  management: {
    title: 'The Council Grounds',
    subtitle: 'Where Strategy Rules All',
    count: 5,
    theme: 'ember',
    color: '#8B5E1A'
  }
};
