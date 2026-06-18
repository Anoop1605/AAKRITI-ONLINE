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
}

export const events: Event[] = [
  // ── SPORTS ──────────────────────────────────────────
  {
    id: 'sp-01', name: 'Throwball', category: 'sports',
    districtName: 'Stone Breathing District',
    districtTheme: 'card-stone',
    tagline: 'Strength. Speed. Precision.',
    description: 'Fast-paced battle of reflexes and raw throwing power.',
    teamSize: '9v9', duration: '45 min', icon: 'Circle'
  },
  {
    id: 'sp-02', name: 'Volleyball', category: 'sports',
    districtName: 'Wind Breathing District',
    districtTheme: 'card-wind',
    tagline: 'Rise. Spike. Conquer.',
    description: 'Six warriors per side. One court. Endless sky.',
    teamSize: '6v6', duration: '60 min', icon: 'ArrowUp'
  },
  {
    id: 'sp-03', name: 'Carrom', category: 'sports',
    districtName: 'Shadow Breathing District',
    districtTheme: 'card-shadow',
    tagline: 'Precision. Silence. Victory.',
    description: 'In the quiet chamber, only focus survives.',
    teamSize: '1v1 / 2v2', duration: '30 min', icon: 'Target'
  },
  {
    id: 'sp-04', name: 'Table Tennis', category: 'sports',
    districtName: 'Thunder Breathing District',
    districtTheme: 'card-thunder',
    tagline: 'Strike. Faster.',
    description: 'Lightning reflexes. Millisecond decisions.',
    teamSize: '1v1', duration: '20 min', icon: 'Zap'
  },
  {
    id: 'sp-05', name: 'Powerlifting', category: 'sports',
    districtName: 'Iron Breathing District',
    districtTheme: 'card-iron',
    tagline: 'Forge. Break. Surpass.',
    description: 'Test the absolute limits of raw human strength.',
    teamSize: 'Solo', duration: '45 min', icon: 'Dumbbell'
  },
  {
    id: 'sp-06', name: 'Squats Challenge', category: 'sports',
    districtName: 'Earth Breathing District',
    districtTheme: 'card-earth',
    tagline: 'One more. Always one more.',
    description: 'Max reps. Max will. Who breaks first?',
    teamSize: 'Solo', duration: '15 min', icon: 'TrendingDown'
  },

  // ── CULTURAL ────────────────────────────────────────
  {
    id: 'cu-01', name: 'Fashion Show', category: 'cultural',
    districtName: 'District of Elegance',
    districtTheme: 'card-elegance',
    tagline: 'Walk. Own. Reign.',
    description: 'The crimson runway awaits. Own every step.',
    teamSize: '5–10', duration: '90 min', icon: 'Sparkles'
  },
  {
    id: 'cu-02', name: 'Duet Dance', category: 'cultural',
    districtName: 'Moonlight Courtyard',
    districtTheme: 'card-moonlight',
    tagline: 'Two souls. One rhythm.',
    description: 'Under the full moon, synchrony becomes art.',
    teamSize: '2', duration: '5 min', icon: 'Music'
  },
  {
    id: 'cu-03', name: 'Group Dance', category: 'cultural',
    districtName: 'Performance Plaza',
    districtTheme: 'card-plaza',
    tagline: 'Many voices. One thunder.',
    description: 'The stage belongs to those who command it.',
    teamSize: '6–15', duration: '8 min', icon: 'Radio'
  },
  {
    id: 'cu-04', name: 'Treasure Hunt', category: 'cultural',
    districtName: 'The Hidden Path',
    districtTheme: 'card-path',
    tagline: 'Seek. Decode. Triumph.',
    description: 'Clues hidden across campus. Race your rivals.',
    teamSize: '3–5', duration: '120 min', icon: 'Map'
  },
  {
    id: 'cu-05', name: 'Short Film', category: 'cultural',
    districtName: 'Chronicles Studio',
    districtTheme: 'card-studio',
    tagline: 'Tell it. In 10 minutes.',
    description: 'A story told in under 10 minutes. Make it unforgettable.',
    teamSize: '2–8', duration: 'Submit 72h prior', icon: 'Film'
  },
  {
    id: 'cu-06', name: 'BGMI Online', category: 'cultural',
    districtName: 'The Gaming Realm',
    districtTheme: 'card-gaming',
    tagline: 'Squad. Strategy. Survive.',
    description: 'The battlefield is digital. The glory is real.',
    teamSize: '4', duration: '2 matches', icon: 'Gamepad2'
  },

  // ── MANAGEMENT ──────────────────────────────────────
  {
    id: 'mg-01', name: 'Business Quiz', category: 'management',
    districtName: 'The Council Chamber',
    districtTheme: 'card-council',
    tagline: 'Know. React. Win.',
    description: 'Market trends, strategy, trivia — all tested.',
    teamSize: '2', duration: '60 min', icon: 'BrainCircuit'
  },
  {
    id: 'mg-02', name: 'Ads Creation', category: 'management',
    districtName: 'The Market Quarter',
    districtTheme: 'card-market',
    tagline: 'Sell the unsellable.',
    description: 'Creativity meets commerce. Make them believe.',
    teamSize: '2–4', duration: '90 min', icon: 'Megaphone'
  },
  {
    id: 'mg-03', name: 'Mock Interview', category: 'management',
    districtName: 'The Dojo of Words',
    districtTheme: 'card-dojo',
    tagline: 'Face the panel. Hold ground.',
    description: 'The spotlight is yours. Defend your worth.',
    teamSize: 'Solo', duration: '20 min/slot', icon: 'UserCheck'
  },
  {
    id: 'mg-04', name: 'Finance Quantum', category: 'management',
    districtName: 'The Treasury Vault',
    districtTheme: 'card-vault',
    tagline: 'Numbers are power.',
    description: 'Financial warfare through strategy and calculation.',
    teamSize: '2', duration: '75 min', icon: 'BarChart2'
  },
  {
    id: 'mg-05', name: 'Startup Stall', category: 'management',
    districtName: 'The Innovation Quarter',
    districtTheme: 'card-innovation',
    tagline: 'Build. Pitch. Conquer.',
    description: 'Pitch your idea. Win the market. Claim the quarter.',
    teamSize: '2–5', duration: 'Full day', icon: 'Lightbulb'
  },

  // ── RESERVED SLOTS ──────────────────────────────────
  {
    id: 'ph-01', name: '[EVENT NAME]', category: 'sports',
    districtName: 'The Forgotten District',
    districtTheme: 'card-placeholder-1',
    tagline: '[To be written]',
    description: 'A mysterious realm yet to be unveiled. Keep watch.',
    teamSize: '[TEAM]', duration: '[DURATION]', icon: 'HelpCircle',
    isPlaceholder: true
  },
  {
    id: 'ph-02', name: '[EVENT NAME]', category: 'cultural',
    districtName: 'The Forgotten District',
    districtTheme: 'card-placeholder-2',
    tagline: '[To be written]',
    description: 'A mysterious realm yet to be unveiled. Keep watch.',
    teamSize: '[TEAM]', duration: '[DURATION]', icon: 'HelpCircle',
    isPlaceholder: true
  },
  {
    id: 'ph-03', name: '[EVENT NAME]', category: 'management',
    districtName: 'The Forgotten District',
    districtTheme: 'card-placeholder-3',
    tagline: '[To be written]',
    description: 'A mysterious realm yet to be unveiled. Keep watch.',
    teamSize: '[TEAM]', duration: '[DURATION]', icon: 'HelpCircle',
    isPlaceholder: true
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
