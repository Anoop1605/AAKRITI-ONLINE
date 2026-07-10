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
  contact?: string;          // Direct mobile contact for event head
  whatsappLink?: string;     // WhatsApp group link for the event
  maxSeats?: number;         // Optional seat limit for registration
}

export const events: Event[] = [
  // === SPORTS (THE BREATHING DISTRICTS) ===
  {
    id: 'sp-01', 
    name: 'Throwball', 
    category: 'sports',
    districtName: 'Stone Breathing District',
    districtTheme: 'card-stone',
    tagline: 'Catch. Release. Conquer.',
    description: 'A fast-paced test of aerial coordination and lightning-quick court reflexes.',
    teamSize: '7v7 (Max 10 per team)', 
    duration: 'Best of 3 Sets', 
    icon: 'Circle',
    rules: [
      'Max 10 players (7 active on court, 3 substitutes).',
      'Ball must be caught with both hands and returned with one hand only.',
      'Ball must be released from above the shoulder line within 3 seconds of catching.',
      'Two players cannot catch or touch the ball simultaneously.',
      'Service must be from behind the end line cleanly out of the palm.',
      'Net touch by players or body touch by the ball (other than palms/hands) is a foul.'
    ],
    venue: 'College Ground',
    time: '18/07/2026, 9:30 AM',
    fee: '₹649 per team',
    contact: 'Sushanth J: 9742688153'
  },
  {
    id: 'sp-02', 
    name: 'Volleyball', 
    category: 'sports',
    districtName: 'Wind Breathing District',
    districtTheme: 'card-wind',
    tagline: 'Rise. Spike. Dominate.',
    description: 'Six warriors guarding the floor, soaring high to break through the enemy defense.',
    teamSize: '6v6 (Max 10 per team)', 
    duration: 'Best of 3 Sets', 
    icon: 'ArrowUp',
    rules: [
      'Max 10 players per team (6 on court, 4 rolling substitutes).',
      'Preliminary rounds are best of 3 sets (15 points each, deciding 3rd set to 15).',
      'Rally point system applies. Must win by a minimum 2-point margin.',
      'A maximum of 3 touches per side is permitted (blocking does not count as a touch).',
      'No player is allowed to touch the net or cross the center line completely during active play.'
    ],
    venue: 'College Ground',
    time: '20/07/2026, 9:30 AM',
    fee: '₹590 per team',
    contact: 'Karthik P V: 8296555433'
  },
  {
    id: 'sp-03', 
    name: 'Carrom', 
    category: 'sports',
    districtName: 'Shadow Breathing District',
    districtTheme: 'card-shadow',
    tagline: 'Precision. Silence. Strike.',
    description: 'In the quiet chamber, a single calculated flick decides who claims the board.',
    teamSize: 'Singles / Doubles', 
    duration: 'Points Based', 
    icon: 'Target',
    rules: [
      'Coin toss decides choice of break (striking first plays White) or board side.',
      'Striker must touch both the front and back line of your baseline cleanly.',
      'Striker must be flicked with a single finger; forward pushing/shoving is a foul.',
      'Queen can be pocketed anytime after your first piece is down, but must be covered next strike.',
      'The Queen cannot be pocketed last. If pocketed alongside your final piece, you lose the board.',
      'Fouls (pocketing striker, touching other pieces) incur a "Due" penalty piece returned to center.'
    ],
    venue: 'College Auditorium',
    time: '20/07/2026, 11:00 AM',
    fee: '₹177 per entry',
    contact: 'Manoj Gowda DM: 8660229528'
  },
  {
    id: 'sp-07', 
    name: 'Tug of War', 
    category: 'sports',
    districtName: 'Unbreakable Grip District',
    districtTheme: 'card-tug', 
    tagline: 'Hold Ground. Break Spirits.',
    description: 'Eight pullers acting as one wall of absolute resistance. Do not break connection.',
    teamSize: '8 Pullers', 
    duration: 'Best of 3 Pulls', 
    icon: 'Swords',
    rules: [
      '8 active pullers per team. Max weight strictly enforced (e.g. Men: 640kg max).',
      'Knockout brackets format, best of 3 pulls total.',
      'A pull is won when opponent’s closest rope marker crosses the center line on the ground.',
      'No Anchoring: Rope cannot be wrapped/tied around body (except safety rules for the end anchor).',
      'No Sitting/Locking: Feet must remain flat. Sitting or locking limbs to stall is a foul.',
      'Proper footwear required (no spiked boots or bare feet unless specified).'
    ],
    venue: 'College Ground',
    time: '20/07/2026, 12:00 PM',
    fee: '₹826 per team',
    contact: 'Rakesh Gowda: 9035766332'
  },
  {
    id: 'sp-08', 
    name: 'Cricket', 
    category: 'sports',
    districtName: 'Supreme Arena District',
    districtTheme: 'card-cricket', 
    tagline: '8 Overs. Infinite Glory.',
    description: 'High-octane T8 format where strategic positioning and heavy hitting rule the pitch.',
    teamSize: '11 Players', 
    duration: '8 Overs per Innings', 
    icon: 'Activity',
    rules: [
      'Maximum of 2 overs per single bowler. Remaining overs shared across the team.',
      'Overs 1-2 are Mandatory Powerplay (Max 2 fielders outside 30-yard circle).',
      'Overs 3-8 allow a maximum of 5 fielders outside the circle.',
      '30-minute strict limit per innings. Delay penalizes by forcing an extra fielder inside.',
      'Standard ICC extras: Wide/No-Ball = 1 penalty run + extra ball. Free hit on all No-Balls.',
      'Tie-Breaker: 1 Over Super Over (Max 2 wickets). Further ties broken by main match boundaries.',
      'Live tournament score tracking will be updated directly via Cric-Heroes.'
    ],
    venue: 'Hoysala Ground, New Town',
    time: '18/07/2026 & 19/07/2026, 8:00 AM',
    fee: '₹1121 per team',
    contact: 'K A Adarsha: 7483975962'
  },

  // === CULTURAL ===
  {
    id: 'cu-01', 
    name: 'Fashion Show', 
    category: 'cultural',
    districtName: 'District of Elegance',
    districtTheme: 'card-elegance',
    tagline: 'Walk. Own. Reign.',
    description: 'The grandeur of fashion unfolds as teams embody styling themes on the main stage.',
    teamSize: '10 + 2 members', 
    duration: '10 + 2 mins', 
    icon: 'Sparkles',
    rules: [
      'Theme: Open Theme.',
      'Time Limit: 10 + 2 minutes.',
      'Participants should be ready with the music prior to the event, and it must be submitted beforehand.',
      'Costumes should be modest and not too revealing.',
      'Usage of props is permitted. No offensive props like fire, knives, or glitters are allowed.',
      'Participants once registered cannot back out from the event.'
    ],
    venue: 'Auditorium',
    time: '21ST JULY 2026, 02:15 pm Onwards',
    fee: '₹590',
    contact: 'Shobha: 8660510769 / Ganga: 7349184637'
  },
  {
    id: 'cu-02', 
    name: 'Duet Dance', 
    category: 'cultural',
    districtName: 'Moonlight Courtyard',
    districtTheme: 'card-moonlight',
    tagline: 'Two souls. One rhythm.',
    description: 'Bring back the classic retro vibes through expression and choreography synchronization.',
    teamSize: '2 members', 
    duration: '3 + 1 mins', 
    icon: 'Music',
    rules: [
      'Theme: Retro (Songs must be selected from movies of the 1970s - 1980s).',
      'Time Limit: 3 + 1 minutes.',
      'Participants should be ready with the music prior to the event and submit it in MP3 format only.',
      'No inappropriate lyrics or dance moves are permitted.',
      'Costumes should be modest and not too revealing.',
      'Usage of props is permitted (No offensive props like fire, knives, or glitters).',
      'Participants once registered cannot back out from the event.'
    ],
    venue: 'Auditorium',
    time: '21ST JULY 2026, 10:45 am Onwards',
    fee: '₹354',
    contact: 'Manasa: 6362882275 / Sandhya: 9342014301'
  },
  {
    id: 'cu-03', 
    name: 'Group Dance', 
    category: 'cultural',
    districtName: 'Performance Plaza',
    districtTheme: 'card-plaza',
    tagline: 'Many voices. One thunder.',
    description: 'Command the floor with clean choreography execution, synchronization, and power configurations.',
    teamSize: '6 to 12 members', 
    duration: '4 + 2 mins', 
    icon: 'Radio',
    rules: [
      'Theme: Open Theme.',
      'Time Limit: 4 + 2 minutes.',
      'Participants should be ready with the music prior to the event and submit it beforehand.',
      'No inappropriate lyrics or dance moves are permitted.',
      'Costumes should be modest and not too revealing.',
      'Usage of props is permitted (No offensive props like fire, knives, or glitters).',
      'Participants once registered cannot back out from the event.'
    ],
    venue: 'Auditorium',
    time: '21ST JULY 2026, 12:00 pm Onwards',
    fee: '₹472',
    contact: 'Manasa: 6362882275 / Sandhya: 9342014301'
  },
  {
    id: 'cu-04', 
    name: 'Treasure Hunt', 
    category: 'cultural',
    districtName: 'The Hidden Path',
    districtTheme: 'card-path',
    tagline: 'Seek. Decode. Triumph.',
    description: 'Uncover cryptic anomalies and sprint across checkpoints hidden throughout the campus layout.',
    teamSize: '3 + 1 members', 
    duration: 'Clue Based', 
    icon: 'Map',
    rules: [
      'The event comprises multiple clues leading to checkpoints across the campus.',
      'Teams must solve each clue before proceeding to the next location.',
      'Tampering with, removing, or revealing clues to other teams is strictly prohibited (leads to DQ).',
      'Participants must remain within the designated event area throughout.',
      'Use of mobile phones, internet, or external assistance is not permitted unless specified.',
      'Any form of unfair means or misconduct will lead to immediate disqualification.',
      'The first team to complete all checkpoints and reach the final spot wins.'
    ],
    venue: 'College Campus',
    time: '21ST JULY 2026, 11:30 am Onwards',
    fee: '₹354',
    contact: 'Dhanush: 7676203483 / Pradeep: 9019872780'
  },
  {
    id: 'cu-05', 
    name: 'Short Film', 
    category: 'cultural',
    districtName: 'Chronicles Studio',
    districtTheme: 'card-studio',
    tagline: 'Tell it. In 5 minutes.',
    description: 'Capture the living cinematic moments and spirit of the battlefields in real-time.',
    teamSize: '2 + 1 members', 
    duration: 'Same-day Shoot & Edit', 
    icon: 'Film',
    rules: [
      'Participants must capture highlights from all events, starting from 10:45 AM until the Fashion Show.',
      'Only mobile phones are permitted for recording. Footage must be shot by registered members only.',
      'Participants must complete both shooting and editing within the event duration. No extra time.',
      'The final video file must be in MP4 format and should not exceed 5 minutes.',
      'Content must be original and free from offensive, violent, or discriminatory material.',
      'The use of unauthorized copyrighted content or external assistance is strictly prohibited.'
    ],
    venue: 'Auditorium',
    time: '21ST JULY 2026, 09:45 am Onwards',
    fee: '₹295',
    contact: 'Manish: 9108037448'
  },
  {
    id: 'cu-06', 
    name: 'Free Fire', 
    category: 'cultural',
    districtName: 'The Gaming Realm',
    districtTheme: 'card-gaming',
    tagline: 'Squad. Strategy. Survive.',
    description: 'Drop into custom rooms, configure strategic positioning, and dominate the arena.',
    teamSize: '4 members', 
    duration: 'Match Format', 
    icon: 'Gamepad2',
    rules: [
      'Each team shall consist of 4 registered players. Only registered participants can play.',
      'Substitution with friends or external participants is strictly prohibited.',
      'Participants must bring their own mobile devices with Free Fire MAX updated and arrange internet.',
      'Room IDs and passwords will be shared by organizers before each match. Join on time.',
      'The use of hacks, cheats, scripts, emulators, or third-party applications leads to instant DQ.',
      'Intentional teaming with other squads or unsportsmanlike conduct will lead to disqualification.',
      'The format and scoring rules will be announced prior to the event commencement.'
    ],
    venue: 'ROOM 207',
    time: '21ST JULY 2026, 11:00 am Onwards',
    fee: '₹295',
    contact: 'Abhishek R: 9741094602 / Guru Prasad: 9141121214',
    maxSeats: 12
  },

  // === MANAGEMENT ===
  {
    id: 'mg-01', 
    name: 'Business Quiz', 
    category: 'management',
    districtName: 'The Council Chamber',
    districtTheme: 'card-council',
    tagline: 'Know. React. Win.',
    description: 'Test your strategic depth across global commerce trends and corporate affairs.',
    teamSize: '2 + 1 members', 
    duration: '60 min', 
    icon: 'BrainCircuit',
    rules: [
      'Rounds will be revealed on the day of the event execution.',
      'Participants are strictly not allowed to use mobile phones or other electronic gadgets.',
      'Suggested scope: Global business trends, strategic affairs, and current corporate news.',
      'Judges decision will be final and are not subject to any structural changes.',
      'Participants once registered cannot back out from the event context.'
    ],
    venue: 'ROOM 107',
    time: '21ST JULY 2026, 11:00 am Onwards',
    fee: '₹295',
    contact: 'Shravani: 7349692889 / Deepa Naik: 8217577739'
  },
  {
    id: 'mg-02', 
    name: 'Ads Creation', 
    category: 'management',
    districtName: 'The Market Quarter',
    districtTheme: 'card-market',
    tagline: 'Sell the unsellable.',
    description: 'Craft dynamic promotional strategies to convince the board panel inside the arena.',
    teamSize: '2 + 1 members', 
    duration: '120 seconds execution', 
    icon: 'Megaphone',
    rules: [
      'Participants are requested to shoot material using mobile phones only.',
      'The generated advertisement should be exactly 120 seconds in length.',
      'Advertisements should not hurt, insult, or offend any person, community, or religion.',
      'Content must not contain violence, abusive language, or disturbing graphics.',
      'The finalized output should be submitted in MP4 format explicitly.',
      'Advertisements must remain professional, suitable for public audience contexts.',
      'Participants once registered cannot back out from the event.'
    ],
    venue: 'Sabhangana',
    time: '21ST JULY 2026, 11:00 am Onwards',
    fee: '₹295',
    contact: 'Yogesh: 7483074632 / Keerthi Reddy: 6360920971'
  },
  {
    id: 'mg-03', 
    name: 'Best Manager', 
    category: 'management',
    districtName: 'The Dojo of Words',
    districtTheme: 'card-dojo',
    tagline: 'Face the panel. Hold ground.',
    description: 'The ultimate survival test evaluating composure, analytical instincts, and leadership excellence.',
    teamSize: 'Solo entry', 
    duration: 'Full Day Brackets', 
    icon: 'UserCheck',
    rules: [
      'This is a single event entry structure.',
      'Participants are explicitly requested to carry their own computing gadgets (laptop, phones).',
      'Core format structural rules will be briefed directly on the day of coordination.',
      'Multiple participation entries are accepted per college institution.',
      'Once registered, participants are locked into execution and cannot back out.'
    ],
    venue: 'ROOM 105',
    time: '21ST JULY 2026, 11:00 am Onwards',
    fee: '₹118',
    contact: 'Kishore: 8296841479 / Aishwarya: 6362593315'
  },
  {
    id: 'mg-04', 
    name: 'Finance', 
    category: 'management',
    districtName: 'The Treasury Vault',
    districtTheme: 'card-vault',
    tagline: 'Numbers are power.',
    description: 'Deploy defensive resource allocations and survive volatile market shifts.',
    teamSize: '2 + 1 members', 
    duration: 'Timed Rounds', 
    icon: 'BarChart2',
    rules: [
      'Participants are requested to have exactly one laptop per team instance.',
      'Internet access will not be distributed by organizers; arrange your own backup links.',
      'Any trace of malpractice or coordination errors results in immediate disqualification.',
      'Each investment challenge round must resolve strictly within the allotted time.',
      'Decisions made must be based solely on data points delivered by context coordinators.',
      'Participants once registered cannot back out from the execution loop.'
    ],
    venue: 'ROOM 103',
    time: '21ST JULY 2026, 11:00 am Onwards',
    fee: '₹295',
    contact: 'Jayanth: 7483676497 / Padmashree: 6363277078'
  },
  {
    id: 'mg-05', 
    name: 'Business Analytics', 
    category: 'management',
    districtName: 'The Innovation Quarter',
    districtTheme: 'card-innovation',
    tagline: 'Build. Pitch. Conquer.',
    description: 'Transform complex database matrices into elegant operational dashboards.',
    teamSize: '2 + 1 members', 
    duration: 'Submissions based', 
    icon: 'Lightbulb',
    rules: [
      'Having one laptop per team is completely mandatory for this event.',
      'Software (Excel, Power BI, or Tableau) should be fully installed prior to execution.',
      'No Wi-Fi or internet configurations will be provided on-site by organizers.',
      'The use of external AI interfaces, smartwatches, or phones is strictly prohibited.',
      'Any structural plagiarism or data manipulation results in immediate disqualification.',
      'All dashboard submissions must complete within strict allotted timelines.',
      'Participants once registered cannot back out from the event.'
    ],
    venue: 'ROOM 102',
    time: '21ST JULY 2026, 11:00 am Onwards',
    fee: '₹295',
    contact: 'Kavya: 7899245458 / Kim Kishore: 7019670343'
  },
  {
    id: 'mg-06', 
    name: 'Trade Barter', 
    category: 'management',
    districtName: 'The Shifting Gates',
    districtTheme: 'card-gaming',
    tagline: 'Barter. Negotiate. Dominate.',
    description: 'Exchange identical starting objects continuously to amplify final evaluation valuation.',
    teamSize: '2 members', 
    duration: '2 Hours', 
    icon: 'Activity',
    rules: [
      'Each team consists of exactly 2 active participants — a Negotiator and a Recorder.',
      'The Negotiator trades items, while the Recorder documents exchanges with videos.',
      'Every team will be initialized with the exact same base starting object asset.',
      'Cash transactions and the use of personal money are strictly prohibited (Barter only).',
      'Exchanges must remain genuine, ethical, and free from coercion or misrepresentation.',
      'Teams must present their finalized assets along with verification logs at the deadline.',
      'The team carrying the highest-value verified product wins the bracket.'
    ],
    venue: 'Around the campus',
    time: '21ST JULY 2026, 11:00 am Onwards',
    fee: '₹177',
    contact: 'Punith Kumar: 9740524323 / Pratheeksha: 9902327181'
  }
];

// Category metadata
export const categories = {
  sports: {
    title: 'The Breathing Districts',
    subtitle: 'Where Strength Meets Honour',
    count: 5,
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
    count: 6,
    theme: 'ember',
    color: '#8B5E1A'
  }
};

const whatsappLinksMap: Record<string, string> = {
  'sp-01': 'https://chat.whatsapp.com/HP1h5FBiMnHD7kx9duUXE6', // Throwball
  'sp-02': 'https://chat.whatsapp.com/CYP5qL8TSsMDL7ldgu1SeU', // Volleyball
  'sp-03': 'https://chat.whatsapp.com/E74vv2vD0bO1MPXhDYgtMc', // Carrom
  'sp-07': 'https://chat.whatsapp.com/IFAgqcDzHUm8wtff80c2Uz', // Tug of War
  'sp-08': 'https://chat.whatsapp.com/KE8NtYAznCt89g0u9Fw5FC', // Cricket
  'cu-01': 'https://chat.whatsapp.com/EMtGH7BS1kMGWfACYxJHHi', // Fashion Show
  'cu-02': 'https://chat.whatsapp.com/FLuxaK81JqmFreKyufKsGk', // Duet Dance
  'cu-03': 'https://chat.whatsapp.com/K7AsY21cfsiFeYqcth5QuF', // Group Dance
  'cu-04': 'https://chat.whatsapp.com/H5ABEbBqIj1EjpRslxXOMB', // Treasure Hunt
  'cu-05': 'https://chat.whatsapp.com/LFqNJNGP4QoCA81arO9fub', // Short Film
  'cu-06': 'https://chat.whatsapp.com/Da8dluRyolrA3uTKuIRGmZ', // Free Fire
  'mg-01': 'https://chat.whatsapp.com/ClKHY9eoXJW84eP9EmycYt', // Business Quiz
  'mg-02': 'https://chat.whatsapp.com/BevIIukrLIW9409FsuhZcS', // Ads Creation
  'mg-03': 'https://chat.whatsapp.com/ELGIgA2VJZc5HBjZeS9uXb', // Best Manager
  'mg-04': 'https://chat.whatsapp.com/BaoGk3TzwHiI9XiU15Qmdp', // Finance
  'mg-05': 'https://chat.whatsapp.com/HfR3NTcyTvR3R4DUGYoTSz', // Business Analytics
  'mg-06': 'https://chat.whatsapp.com/C3QBFht3Um0BPxr7ZLaRet', // Trade Barter
};

events.forEach(e => {
  e.whatsappLink = whatsappLinksMap[e.id] || '';
});

