export interface Movie {
  id: string;
  title: string;
  platform: string;
  year: number;
  genre: string;
  rating: number;
  image: string;
  description: string;
  trending?: boolean;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const platforms: Platform[] = [
  { id: 'netflix', name: 'Netflix', icon: '🎬', color: '#E50914' },
  { id: 'prime', name: 'Prime Video', icon: '📺', color: '#00A8E1' },
  { id: 'disney', name: 'Disney+', icon: '✨', color: '#113CCF' },
  { id: 'hulu', name: 'Hulu', icon: '🎭', color: '#1CE783' },
  { id: 'hbo', name: 'HBO Max', icon: '🎪', color: '#7C3FD6' },
  { id: 'apple', name: 'Apple TV+', icon: '🍎', color: '#000000' },
  { id: 'paramount', name: 'Paramount+', icon: '⛰️', color: '#0064FF' },
  { id: 'peacock', name: 'Peacock', icon: '🦚', color: '#000000' },
];

export const movies: Movie[] = [
  {
    id: '1',
    title: 'The Midnight Chronicle',
    platform: 'netflix',
    year: 2024,
    genre: 'Thriller',
    rating: 8.7,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1200&fit=crop',
    description: 'A detective uncovers a conspiracy that spans decades in this gripping thriller.',
    trending: true,
  },
  {
    id: '2',
    title: 'Neon Dreams',
    platform: 'prime',
    year: 2025,
    genre: 'Sci-Fi',
    rating: 9.1,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200&fit=crop',
    description: 'In a dystopian future, a hacker discovers the truth about reality itself.',
    trending: true,
  },
  {
    id: '3',
    title: 'The Last Voyage',
    platform: 'disney',
    year: 2024,
    genre: 'Adventure',
    rating: 8.5,
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=1200&fit=crop',
    description: 'An epic journey across uncharted waters to discover a legendary treasure.',
    trending: true,
  },
  {
    id: '4',
    title: 'Echoes of Tomorrow',
    platform: 'hbo',
    year: 2025,
    genre: 'Drama',
    rating: 8.9,
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200&fit=crop',
    description: 'A time-bending drama about choices, consequences, and redemption.',
    trending: true,
  },
  {
    id: '5',
    title: 'Shadow Protocol',
    platform: 'apple',
    year: 2024,
    genre: 'Action',
    rating: 8.3,
    image: 'https://images.unsplash.com/photo-1509266272358-7701da638078?w=800&h=1200&fit=crop',
    description: 'A special ops team must stop a global threat before time runs out.',
    trending: true,
  },
  {
    id: '6',
    title: 'Starbound',
    platform: 'paramount',
    year: 2025,
    genre: 'Sci-Fi',
    rating: 8.8,
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=1200&fit=crop',
    description: 'Humanity\'s first mission beyond our solar system reveals unexpected wonders.',
    trending: true,
  },
  {
    id: '7',
    title: 'The Art of Silence',
    platform: 'hulu',
    year: 2024,
    genre: 'Mystery',
    rating: 8.6,
    image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&h=1200&fit=crop',
    description: 'A mime artist becomes the key witness to a crime they cannot speak about.',
    trending: true,
  },
  {
    id: '8',
    title: 'Crimson Horizon',
    platform: 'peacock',
    year: 2025,
    genre: 'Western',
    rating: 8.4,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
    description: 'A lone ranger seeks justice in the lawless frontier of the Old West.',
    trending: true,
  },
  {
    id: '9',
    title: 'Digital Ghosts',
    platform: 'netflix',
    year: 2024,
    genre: 'Horror',
    rating: 7.9,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=1200&fit=crop',
    description: 'Social media influencers face supernatural consequences for their actions.',
    trending: true,
  },
  {
    id: '10',
    title: 'Quantum Hearts',
    platform: 'prime',
    year: 2025,
    genre: 'Romance',
    rating: 8.2,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=1200&fit=crop',
    description: 'Two souls meet across parallel universes in this mind-bending love story.',
    trending: true,
  },
  {
    id: '11',
    title: 'The Iron Crown',
    platform: 'disney',
    year: 2024,
    genre: 'Fantasy',
    rating: 9.0,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=1200&fit=crop',
    description: 'A reluctant heir must claim their throne to save the kingdom from darkness.',
    trending: true,
  },
  {
    id: '12',
    title: 'Velocity',
    platform: 'hbo',
    year: 2025,
    genre: 'Action',
    rating: 8.1,
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&h=1200&fit=crop',
    description: 'An underground racing circuit becomes the battleground for corporate espionage.',
    trending: true,
  },
  {
    id: '13',
    title: 'Whispers in the Dark',
    platform: 'apple',
    year: 2024,
    genre: 'Thriller',
    rating: 8.5,
    image: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&h=1200&fit=crop',
    description: 'A podcast host investigating urban legends uncovers a terrifying truth.',
  },
  {
    id: '14',
    title: 'The Constellation Project',
    platform: 'paramount',
    year: 2025,
    genre: 'Sci-Fi',
    rating: 8.7,
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=1200&fit=crop',
    description: 'Scientists receive a mysterious signal that could change everything we know.',
  },
  {
    id: '15',
    title: 'Borderlands',
    platform: 'hulu',
    year: 2024,
    genre: 'Drama',
    rating: 8.3,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
    description: 'Families on both sides of a border struggle with identity and belonging.',
  },
  {
    id: '16',
    title: 'The Frequency',
    platform: 'peacock',
    year: 2025,
    genre: 'Mystery',
    rating: 8.0,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1200&fit=crop',
    description: 'A radio DJ discovers they can communicate with someone from the past.',
  },
];
