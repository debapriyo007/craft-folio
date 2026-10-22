import { AnimeItem, HipHopArtist, CurrentlyListening, RoomModule } from '../models/zone.model';

export const ROOM_MODULES: RoomModule[] = [
  {
    id: 'lab',
    title: 'DEVELOPER LAB',
    category: 'TERMINAL CLI SANDBOX',
    icon: 'monitor',
    targetId: 'developer-lab',
    description: 'Interactive CLI sandbox, command palette, and developer terminal environment.',
  },
  {
    id: 'music',
    title: 'HIP-HOP STATION',
    category: 'RETRO MUSIC TERMINAL',
    icon: 'headphones',
    targetId: 'hiphop-station',
    description: 'Tribute to 2Pac (#1 GOAT), Eminem, Kendrick & 50 Cent + interactive Spotify.',
  },
  {
    id: 'anime',
    title: 'ANIME WATCHLIST',
    category: 'REVIEWS & TIERS',
    icon: 'book',
    targetId: 'anime-watchlist',
    description: 'Curated anime watchlist with detailed character reviews.',
  },
];

export const ANIME_DATA: AnimeItem[] = [
  {
    id: 'a1',
    title: 'Attack on Titan',
    poster: 'assets/images/anime/aot.jpg',
    rating: '10/10',
    status: 'COMPLETED',
    episodes: '89 eps',
    genres: ['Dark Fantasy', 'Action', 'Psychological'],
    favoriteCharacter: 'Levi Ackerman',
    personalReview:
      'A masterpiece in foreshadowing, philosophical conflict, and the price of freedom. Levi and Erwin are legendary.',
  },
  {
    id: 'a2',
    title: 'Jujutsu Kaisen',
    poster: 'assets/images/anime/jjk.jpg',
    rating: '9.2/10',
    status: 'WATCHING',
    episodes: '47+ eps',
    genres: ['Supernatural', 'Martial Arts', 'Shonen'],
    favoriteCharacter: 'Satoru Gojo',
    personalReview:
      'Incredible combat choreography, domain expansions, and high-tension pacing during the Shibuya Incident arc.',
  },
  {
    id: 'a3',
    title: 'Death Note',
    poster: 'assets/images/anime/deathnote.jpg',
    rating: '9.5/10',
    status: 'COMPLETED',
    episodes: '37 eps',
    genres: ['Psychological Thriller', 'Suspense'],
    favoriteCharacter: 'L Lawliet',
    personalReview:
      'The ultimate battle of intellects between Light Yagami and L. Kept me on the edge of my seat every episode.',
  },
  {
    id: 'a4',
    title: 'Vinland Saga',
    poster: 'assets/images/anime/vinland.jpg',
    rating: '9.6/10',
    status: 'COMPLETED',
    episodes: '48 eps',
    genres: ['Historical', 'Drama', 'Adventure'],
    favoriteCharacter: 'Askeladd / Thorfinn',
    personalReview:
      '"I have no enemies." Season 2 Farmland arc is one of the most poignant character development arcs ever animated.',
  },
  {
    id: 'a5',
    title: 'Fullmetal Alchemist: Brotherhood',
    poster: 'assets/images/anime/fmab.jpg',
    rating: '9.8/10',
    status: 'COMPLETED',
    episodes: '64 eps',
    genres: ['Adventure', 'Military Fantasy'],
    favoriteCharacter: 'Roy Mustang',
    personalReview:
      'The law of equivalent exchange, brotherly bond, and zero filler episodes. One of the cleanest stories ever told.',
  },
  {
    id: 'a6',
    title: 'One Piece',
    poster: 'assets/images/anime/onepiece.jpg',
    rating: '9.4/10',
    status: 'PLAN TO WATCH',
    episodes: '1100+ eps',
    genres: ['Epic Adventure', 'Pirates', 'Fantasy'],
    favoriteCharacter: 'Roronoa Zoro',
    personalReview:
      'Currently on the journey. The world building, emotional backstories, and scale are in a league of their own.',
  },
];

export const HIPHOP_DATA = {
  artists: [
    {
      id: '2pac',
      name: '2Pac',
      alias: 'Makaveli / Tupac Amaru Shakur',
      avatar: 'assets/images/artists/2pac.svg',
      monogram: '2PAC',
      era: '90s Golden Era / West Coast / Death Row',
      isFavorite: true,
      favoriteBadge: '👑 #1 ALL-TIME FAVORITE ARTIST',
      favoriteTracks: [
        'Changes',
        'Dear Mama',
        'California Love',
        'Keep Ya Head Up',
        'Hit Em Up',
        'Ambitionz Az a Ridah',
      ],
      favoriteAlbums: [
        'All Eyez on Me (1996)',
        'Me Against the World (1995)',
        'Greatest Hits (1998)',
        'The Don Killuminati: The 7 Day Theory (1996)',
      ],
      bio: "Debu's #1 all-time musical artist. Revolutionary poet, philosopher, and immortal golden-era voice whose timeless message forever resonates.",
      topQuote: 'Reality is wrong. Dreams are for the real.',
    },
    {
      id: 'eminem',
      name: 'Eminem',
      alias: 'Slim Shady / Marshall Mathers',
      avatar: 'assets/images/artists/eminem.svg',
      monogram: 'SHADY',
      era: 'Late 90s - 2000s / Detroit / Shady Records',
      favoriteTracks: [
        'Not Afraid',
        'Love The Way You Lie',
        'Lose Yourself',
        'No Love',
        'Till I Collapse',
        'Stan',
      ],
      favoriteAlbums: [
        'Recovery (2010)',
        'The Marshall Mathers LP (2000)',
        'The Eminem Show (2002)',
        'The Slim Shady LP (1999)',
      ],
      bio: 'The lyrical rap god known for lightning-fast multi-syllabic rhyme schemes, razor-sharp storytelling, and an unstoppable cultural legacy.',
      topQuote:
        'Look, if you had one shot, or one opportunity, to seize everything you ever wanted...',
    },
    {
      id: 'kendrick',
      name: 'Kendrick Lamar',
      alias: 'K-Dot / Kung Fu Kenny / Oklama',
      avatar: 'assets/images/artists/kendrick.svg',
      monogram: 'K-DOT',
      era: '2010s - Modern / Compton / pgLang',
      favoriteTracks: ['HUMBLE.', 'Alright', 'DNA.', 'Money Trees', 'm.A.A.d city'],
      favoriteAlbums: [
        'good kid, m.A.A.d city (2012)',
        'To Pimp a Butterfly (2015)',
        'DAMN. (2017)',
      ],
      bio: 'Pulitzer Prize-winning visionary whose conceptual albums explore culture, morality, systemic struggles, and artistic mastery.',
      topQuote: 'If God got us, then we gon be alright.',
    },
    {
      id: '50cent',
      name: '50 Cent',
      alias: 'Curtis Jackson / G-Unit',
      avatar: 'assets/images/artists/50cent.svg',
      monogram: '50',
      era: '2000s Boom / Queens, NY / Aftermath',
      favoriteTracks: [
        'In Da Club',
        'Many Men (Wish Death)',
        '21 Questions',
        'P.I.M.P.',
        'Window Shopper',
      ],
      favoriteAlbums: ['Get Rich or Die Tryin (2003)', 'The Massacre (2005)'],
      bio: 'The quintessential survivor and master of gritty, melodic street anthems with unstoppable swagger and infectious production.',
      topQuote: 'Sunny days wouldnt be so special, if it wasnt for rain.',
    },
  ] as HipHopArtist[],
  currentlyListening: {
    track: 'Changes',
    artist: '2Pac',
    album: 'Greatest Hits (1998)',
    albumCover: 'assets/images/artists/2pac_art.svg',
    status: 'ONLINE • 2PAC VAULT • 320 KBPS VBR',
  } as CurrentlyListening,
  spotifyEmbedUrl:
    'https://open.spotify.com/embed/album/3PogVmhNucYNfyywZvTd7F?utm_source=generator',
};

export const LAB_DATA = {
  currentLearning: [
    {
      title: 'Advanced Spring Boot Microservices',
      tag: 'BACKEND',
      desc: 'Resilience4j circuit breakers, Spring Cloud Gateway, and distributed tracing.',
    },
    {
      title: 'Zoneless Angular & Signal Architecture',
      tag: 'FRONTEND',
      desc: 'High-performance reactive state management with minimal change detection cycles.',
    },
    {
      title: 'Docker Orchestration & Kubernetes',
      tag: 'DEVOPS',
      desc: 'Containerizing multi-service stacks with automated deployment pipelines.',
    },
  ],
  latestExperiments: [
    {
      title: 'Web Audio Procedural Sound Engine',
      tag: 'AUDIO',
      desc: 'Zero-latency synthesizer fallback with dynamic pitch modulation.',
    },
    {
      title: 'Chrome View Transitions Dark/Light Reveal',
      tag: 'CSS/WEB',
      desc: 'Hardware-accelerated circular radial wave theme transitions.',
    },
    {
      title: '60fps HTML5 Canvas Particle System',
      tag: 'CANVAS',
      desc: 'Velocity-driven pixel trail emitter optimized for high refresh rates.',
    },
  ],
  sideProjects: [
    {
      title: 'CraftFolio RPG Portfolio',
      tag: 'LIVE',
      desc: 'Retro pixel-art portfolio inspired by classic Minecraft & RPG hotbars.',
    },
    {
      title: 'JournalApp Cloud API',
      tag: 'BACKEND',
      desc: 'JWT-authenticated journal and note-taking backend service.',
    },
    {
      title: 'CLI Developer Dashboard',
      tag: 'TOOLING',
      desc: 'Terminal utilities for monitoring git repositories and dev workflows.',
    },
  ],
  developmentGoals: [
    { title: 'Contribute to Open-Source Frameworks', target: '2026', progress: 'IN PROGRESS' },
    { title: 'Architect a 100k+ MAU Cloud Application', target: '2026-2027', progress: 'PLANNED' },
    {
      title: 'Publish Deep-Dive Technical Engineering Blogs',
      target: 'ONGOING',
      progress: 'ACTIVE',
    },
  ],
};
