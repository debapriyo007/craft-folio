export type AnimeFilter = 'ALL' | 'WATCHING' | 'COMPLETED' | 'PLAN TO WATCH';

export interface AnimeItem {
  id: string;
  title: string;
  poster: string;
  rating: string;
  status: 'WATCHING' | 'COMPLETED' | 'PLAN TO WATCH';
  episodes: string;
  genres: string[];
  favoriteCharacter: string;
  personalReview: string;
}

export interface HipHopArtist {
  id: string;
  name: string;
  alias?: string;
  avatar: string;
  era: string;
  favoriteTracks: string[];
  favoriteAlbums: string[];
  bio: string;
  topQuote?: string;
  isFavorite?: boolean;
  favoriteBadge?: string;
  monogram?: string;
}

export interface CurrentlyListening {
  track: string;
  artist: string;
  album: string;
  status: string;
  albumCover?: string;
}

export interface TerminalLog {
  id?: number | string;
  command?: string;
  output?: string;
  text?: string;
  type?: 'input' | 'output' | 'standard' | 'success' | 'error' | 'system';
}

export interface RoomModule {
  id: string;
  title: string;
  category: string;
  icon: string;
  targetId: string;
  description: string;
}
