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
    description: 'Tribute to Lil Wayne (Tha Carter VI), Eminem, & Kendrick Lamar + interactive Spotify.',
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
    poster: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    fallbackPoster: 'https://images.weserv.nl/?url=cdn.myanimelist.net/images/anime/10/47347l.jpg',
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
    title: 'Fullmetal Alchemist: Brotherhood',
    poster: 'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg',
    fallbackPoster: 'https://images.weserv.nl/?url=cdn.myanimelist.net/images/anime/1208/94745l.jpg',
    rating: '9.8/10',
    status: 'COMPLETED',
    episodes: '64 eps',
    genres: ['Adventure', 'Military Fantasy', 'Action'],
    favoriteCharacter: 'Roy Mustang',
    personalReview:
      'The law of equivalent exchange, brotherly bond, and zero filler episodes. One of the cleanest stories ever told.',
  },
  {
    id: 'a3',
    title: 'Hunter x Hunter',
    poster: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
    fallbackPoster: 'https://images.weserv.nl/?url=cdn.myanimelist.net/images/anime/1337/99013l.jpg',
    rating: '9.7/10',
    status: 'COMPLETED',
    episodes: '148 eps',
    genres: ['Adventure', 'Dark Fantasy', 'Shonen'],
    favoriteCharacter: 'Killua Zoldyck',
    personalReview:
      'Peak power system with Nen. The Chimera Ant arc is unmatched in emotional gravity, philosophical depth, and Meruem.',
  },
  {
    id: 'a4',
    title: 'Vinland Saga',
    poster: 'https://cdn.myanimelist.net/images/anime/1500/103005l.jpg',
    fallbackPoster: 'https://images.weserv.nl/?url=cdn.myanimelist.net/images/anime/1500/103005l.jpg',
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
    title: 'Death Note',
    poster: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
    fallbackPoster: 'https://images.weserv.nl/?url=cdn.myanimelist.net/images/anime/9/9453l.jpg',
    rating: '9.5/10',
    status: 'COMPLETED',
    episodes: '37 eps',
    genres: ['Psychological Thriller', 'Suspense'],
    favoriteCharacter: 'L Lawliet',
    personalReview:
      'The ultimate battle of intellects between Light Yagami and L. Kept me on the edge of my seat every episode.',
  },
  {
    id: 'a6',
    title: 'One Piece',
    poster: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
    fallbackPoster: 'https://images.weserv.nl/?url=cdn.myanimelist.net/images/anime/6/73245l.jpg',
    rating: '9.4/10',
    status: 'WATCHING',
    episodes: '1100+ eps',
    genres: ['Epic Adventure', 'Pirates', 'Fantasy'],
    favoriteCharacter: 'Roronoa Zoro',
    personalReview:
      'Currently on the journey. The world building, emotional backstories, and scale are in a league of their own.',
  },
  {
    id: 'a7',
    title: 'Naruto',
    poster: 'https://cdn.myanimelist.net/images/anime/1565/111305l.jpg',
    fallbackPoster: 'https://images.weserv.nl/?url=cdn.myanimelist.net/images/anime/1565/111305l.jpg',
    rating: '9.3/10',
    status: 'COMPLETED',
    episodes: '720 eps',
    genres: ['Action', 'Martial Arts', 'Shonen'],
    favoriteCharacter: 'Itachi Uchiha',
    personalReview:
      'The journey from village pariah to hero of the Shinobi world. Unforgettable emotional depth and the philosophy of Pain.',
  },
  {
    id: 'a8',
    title: 'Jujutsu Kaisen',
    poster: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
    fallbackPoster: 'https://images.weserv.nl/?url=cdn.myanimelist.net/images/anime/1171/109222l.jpg',
    rating: '9.2/10',
    status: 'COMPLETED',
    episodes: '47+ eps',
    genres: ['Supernatural', 'Martial Arts', 'Shonen'],
    favoriteCharacter: 'Satoru Gojo',
    personalReview:
      'Incredible combat choreography, domain expansions, and high-tension pacing during the Shibuya Incident arc.',
  },
  {
    id: 'a9',
    title: 'Solo Leveling',
    poster: 'https://cdn.myanimelist.net/images/anime/1741/134577l.jpg',
    fallbackPoster: 'https://images.weserv.nl/?url=cdn.myanimelist.net/images/anime/1741/134577l.jpg',
    rating: '9.1/10',
    status: 'COMPLETED',
    episodes: '12+ eps',
    genres: ['Action', 'Dark Fantasy', 'Supernatural'],
    favoriteCharacter: 'Sung Jin-woo',
    personalReview:
      'Peak modern hype and dungeon crawler power progression. Watching Jin-woo rise to Shadow Monarch with A-1 animation is electrifying.',
  },
  {
    id: 'a10',
    title: 'One Punch Man',
    poster: 'https://cdn.myanimelist.net/images/anime/12/76049l.jpg',
    fallbackPoster: 'https://images.weserv.nl/?url=cdn.myanimelist.net/images/anime/12/76049l.jpg',
    rating: '9.0/10',
    status: 'COMPLETED',
    episodes: '24 eps',
    genres: ['Action', 'Comedy', 'Superhero'],
    favoriteCharacter: 'Saitama / Garou',
    personalReview:
      'Madhouse Season 1 animation is legendary. Perfect balance of absurd parody and godly sakuga action sequences.',
  },
];

export const HIPHOP_DATA = {
  artists: [
    {
      id: 'lilwayne',
      name: 'Lil Wayne',
      alias: 'Weezy / Dwayne Michael Carter Jr. / Tunechi',
      avatar: 'assets/images/artists/lilwayne.svg',
      monogram: 'WEEZY',
      era: '2000s - Modern / New Orleans / Young Money',
      favoriteTracks: [
        'A Milli',
        '6 Foot 7 Foot',
        'Mona Lisa',
        'Lollipop',
        'Kant Nobody',
        'Drop the World',
      ],
      favoriteAlbums: [
        'Tha Carter VI (Upcoming)',
        'Tha Carter V (2018)',
        'Tha Carter III (2008)',
        'Tha Carter IV (2011)',
      ],
      bio: 'One of the most prolific and influential lyricists in hip-hop history, mixtape titan, and the visionary architect behind Young Money.',
      topQuote: 'Real Gs move in silence like lasagna.',
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
  ] as HipHopArtist[],
  currentlyListening: {
    track: 'King Carter',
    artist: 'Lil Wayne',
    album: 'Tha Carter VI (2025)',
    albumCover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e023cf33f080e04f7d6400def5d',
    status: 'ONLINE • YOUNG MONEY • FULL ALBUM STREAMING',
  } as CurrentlyListening,
  spotifyEmbedUrl:
    'https://open.spotify.com/embed/album/3f35htoN6xM1w2fKE8YZIJ?utm_source=generator',
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
