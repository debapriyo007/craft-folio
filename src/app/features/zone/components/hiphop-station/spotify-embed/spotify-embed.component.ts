import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface AlbumTrack {
  number: number;
  title: string;
  artist: string;
  duration: string;
  trackId: string;
  embedUrl: string;
  directUrl: string;
}

export interface SpotifyChannel {
  id: string;
  name: string;
  badge: string;
  albumTitle: string;
  embedUrl: string;
  directUrl: string;
  description: string;
  tracks?: AlbumTrack[];
}

export const THA_CARTER_VI_TRACKS: AlbumTrack[] = [
  {
    number: 1,
    title: 'King Carter',
    artist: 'Lil Wayne',
    duration: '1:48',
    trackId: '7BMu5MPL6WzC81Tie6QuiS',
    embedUrl: 'https://open.spotify.com/embed/track/7BMu5MPL6WzC81Tie6QuiS?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/7BMu5MPL6WzC81Tie6QuiS',
  },
  {
    number: 2,
    title: 'Welcome to Tha Carter',
    artist: 'Lil Wayne',
    duration: '3:35',
    trackId: '0wI5MvhcdTrVERaDOHiNnp',
    embedUrl: 'https://open.spotify.com/embed/track/0wI5MvhcdTrVERaDOHiNnp?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/0wI5MvhcdTrVERaDOHiNnp',
  },
  {
    number: 3,
    title: 'Bells',
    artist: 'Lil Wayne',
    duration: '3:24',
    trackId: '5IBaJDzPGl6e2hOfhjymMb',
    embedUrl: 'https://open.spotify.com/embed/track/5IBaJDzPGl6e2hOfhjymMb?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/5IBaJDzPGl6e2hOfhjymMb',
  },
  {
    number: 4,
    title: 'Hip-Hop (feat. BigXthaPlug, Jay Jones)',
    artist: 'Lil Wayne, BigXthaPlug, Jay Jones',
    duration: '4:01',
    trackId: '0t5LNjml8LTuAPiEfD7zFN',
    embedUrl: 'https://open.spotify.com/embed/track/0t5LNjml8LTuAPiEfD7zFN?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/0t5LNjml8LTuAPiEfD7zFN',
  },
  {
    number: 5,
    title: 'Sharks (feat. Jelly Roll, Big Sean)',
    artist: 'Lil Wayne, Jelly Roll, Big Sean',
    duration: '3:49',
    trackId: '5lGd2E7qKxgsMjQcTPTek2',
    embedUrl: 'https://open.spotify.com/embed/track/5lGd2E7qKxgsMjQcTPTek2?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/5lGd2E7qKxgsMjQcTPTek2',
  },
  {
    number: 6,
    title: 'Banned From NO',
    artist: 'Lil Wayne',
    duration: '3:38',
    trackId: '1EP5tYdr5adANtbs4XUvqw',
    embedUrl: 'https://open.spotify.com/embed/track/1EP5tYdr5adANtbs4XUvqw?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/1EP5tYdr5adANtbs4XUvqw',
  },
  {
    number: 7,
    title: 'The Days (feat. Bono)',
    artist: 'Lil Wayne, Bono',
    duration: '4:21',
    trackId: '5c2hmVci8QiI1oskxosMfp',
    embedUrl: 'https://open.spotify.com/embed/track/5c2hmVci8QiI1oskxosMfp?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/5c2hmVci8QiI1oskxosMfp',
  },
  {
    number: 8,
    title: 'Cotton Candy (feat. 2 Chainz)',
    artist: 'Lil Wayne, 2 Chainz',
    duration: '3:26',
    trackId: '2ILSAavE0FTWeZ8pAZY5bS',
    embedUrl: 'https://open.spotify.com/embed/track/2ILSAavE0FTWeZ8pAZY5bS?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/2ILSAavE0FTWeZ8pAZY5bS',
  },
  {
    number: 9,
    title: 'Flex Up',
    artist: 'Lil Wayne',
    duration: '2:50',
    trackId: '1Izzf3GSHQ3rAthq5uLR7X',
    embedUrl: 'https://open.spotify.com/embed/track/1Izzf3GSHQ3rAthq5uLR7X?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/1Izzf3GSHQ3rAthq5uLR7X',
  },
  {
    number: 10,
    title: 'Island Holiday',
    artist: 'Lil Wayne',
    duration: '4:17',
    trackId: '0jYrqJDxDwrCGdvtDK0m0J',
    embedUrl: 'https://open.spotify.com/embed/track/0jYrqJDxDwrCGdvtDK0m0J?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/0jYrqJDxDwrCGdvtDK0m0J',
  },
  {
    number: 11,
    title: 'Loki’s Theme',
    artist: 'Lil Wayne',
    duration: '4:10',
    trackId: '6qkmzDMwkFXDmuBt8x7wZp',
    embedUrl: 'https://open.spotify.com/embed/track/6qkmzDMwkFXDmuBt8x7wZp?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/6qkmzDMwkFXDmuBt8x7wZp',
  },
  {
    number: 12,
    title: 'If I Played Guitar',
    artist: 'Lil Wayne',
    duration: '2:52',
    trackId: '3eR1p57iBqfjtNGoAd9GLp',
    embedUrl: 'https://open.spotify.com/embed/track/3eR1p57iBqfjtNGoAd9GLp?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/3eR1p57iBqfjtNGoAd9GLp',
  },
  {
    number: 13,
    title: 'Peanuts 2 N Elephant',
    artist: 'Lil Wayne',
    duration: '3:12',
    trackId: '1iOAzp9jGfc5QOdjxrD5Ma',
    embedUrl: 'https://open.spotify.com/embed/track/1iOAzp9jGfc5QOdjxrD5Ma?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/1iOAzp9jGfc5QOdjxrD5Ma',
  },
  {
    number: 14,
    title: 'Rari (feat. Kameron Carter)',
    artist: 'Lil Wayne, Kameron Carter',
    duration: '2:50',
    trackId: '1pcImgud77b02A5alGw59U',
    embedUrl: 'https://open.spotify.com/embed/track/1pcImgud77b02A5alGw59U?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/1pcImgud77b02A5alGw59U',
  },
  {
    number: 15,
    title: 'Maria (feat. Andrea Bocelli, Wyclef Jean)',
    artist: 'Lil Wayne, Wyclef Jean, Andrea Bocelli',
    duration: '3:23',
    trackId: '0F6mjMFmyP6l21xnw9Zz2Y',
    embedUrl: 'https://open.spotify.com/embed/track/0F6mjMFmyP6l21xnw9Zz2Y?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/0F6mjMFmyP6l21xnw9Zz2Y',
  },
  {
    number: 16,
    title: 'Bein Myself (feat. Mannie Fresh)',
    artist: 'Lil Wayne, Mannie Fresh',
    duration: '4:39',
    trackId: '60bfqfsO1affF9zJ2UP9Tf',
    embedUrl: 'https://open.spotify.com/embed/track/60bfqfsO1affF9zJ2UP9Tf?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/60bfqfsO1affF9zJ2UP9Tf',
  },
  {
    number: 17,
    title: 'Mula Komin In (feat. Lil Novi)',
    artist: 'Lil Wayne, Lil Novi',
    duration: '3:51',
    trackId: '2MiVc17UInPKsNphRKtsnc',
    embedUrl: 'https://open.spotify.com/embed/track/2MiVc17UInPKsNphRKtsnc?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/2MiVc17UInPKsNphRKtsnc',
  },
  {
    number: 18,
    title: 'Alone In The Studio With My Gun (feat. mgk, Kodak Black)',
    artist: 'Lil Wayne, mgk, Kodak Black',
    duration: '2:52',
    trackId: '7uGBxHPuPrz9YvYssdcqhI',
    embedUrl: 'https://open.spotify.com/embed/track/7uGBxHPuPrz9YvYssdcqhI?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/7uGBxHPuPrz9YvYssdcqhI',
  },
  {
    number: 19,
    title: 'Written History',
    artist: 'Lil Wayne',
    duration: '4:42',
    trackId: '0EmwgiCsD26PQChTu0Y89Z',
    embedUrl: 'https://open.spotify.com/embed/track/0EmwgiCsD26PQChTu0Y89Z?utm_source=generator',
    directUrl: 'https://open.spotify.com/track/0EmwgiCsD26PQChTu0Y89Z',
  },
];

@Component({
  selector: 'app-spotify-embed',
  standalone: true,
  templateUrl: './spotify-embed.component.html',
  styleUrl: './spotify-embed.component.css',
})
export class SpotifyEmbedComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly channels: SpotifyChannel[] = [
    {
      id: 'lilwayne-hits',
      name: 'LIL WAYNE // THA CARTER VI',
      badge: 'THA CARTER VI',
      albumTitle: 'Tha Carter VI',
      embedUrl: 'https://open.spotify.com/embed/album/3f35htoN6xM1w2fKE8YZIJ?utm_source=generator',
      directUrl: 'https://open.spotify.com/album/3f35htoN6xM1w2fKE8YZIJ',
      description:
        'Tha Carter VI (Official Album) by Lil Wayne — Full album continuous playback: King Carter, Welcome to Tha Carter, Bells, Hip-Hop, Sharks, Banned From NO, The Days, Cotton Candy, Maria, and more.',
      tracks: THA_CARTER_VI_TRACKS,
    },
    {
      id: 'eminem-hits',
      name: 'EMINEM // RECOVERY',
      badge: 'RECOVERY',
      albumTitle: 'Recovery',
      embedUrl: 'https://open.spotify.com/embed/album/3PogVmhNucYNfyywZvTd7F?utm_source=generator',
      directUrl: 'https://open.spotify.com/album/3PogVmhNucYNfyywZvTd7F',
      description:
        'Recovery (2010) — Not Afraid, Love The Way You Lie, No Love, Cinderella Man, Space Bound.',
    },
    {
      id: 'kendrick-hits',
      name: 'KENDRICK // DAMN.',
      badge: 'DAMN.',
      albumTitle: 'DAMN.',
      embedUrl: 'https://open.spotify.com/embed/album/4alcGHjstaALJHHiljfy3H?utm_source=generator',
      directUrl: 'https://open.spotify.com/album/4alcGHjstaALJHHiljfy3H',
      description:
        'DAMN. (Collectors Edition) by Kendrick Lamar — HUMBLE., DNA., LOYALTY., ELEMENT., LOVE., DUCKWORTH.',
    },
  ];

  readonly activeChannelId = signal<string>('lilwayne-hits');
  readonly activeTrackEmbedUrl = signal<string | null>(null);
  readonly activeTrackName = signal<string | null>(null);
  readonly isExpanded = signal<boolean>(true);
  readonly isTracklistOpen = signal<boolean>(false);
  readonly isIframeLoading = signal<boolean>(true);

  readonly currentChannel = computed(() => {
    const id = this.activeChannelId();
    return this.channels.find((c) => c.id === id) || this.channels[0];
  });

  readonly safeUrl = computed<SafeResourceUrl>(() => {
    const trackUrl = this.activeTrackEmbedUrl();
    const url = trackUrl || this.currentChannel().embedUrl;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  onIframeLoad(): void {
    this.isIframeLoading.set(false);
  }

  selectChannel(channelId: string): void {
    if (this.activeChannelId() !== channelId) {
      this.isIframeLoading.set(true);
      this.activeChannelId.set(channelId);
      this.activeTrackEmbedUrl.set(null);
      this.activeTrackName.set(null);
    }
  }

  toggleViewMode(): void {
    this.isExpanded.update((v) => !v);
  }

  toggleTracklist(): void {
    this.isTracklistOpen.update((v) => !v);
  }

  cueTrack(track: AlbumTrack): void {
    this.isIframeLoading.set(true);
    this.activeTrackEmbedUrl.set(track.embedUrl);
    this.activeTrackName.set(track.title);
  }

  resetToFullAlbum(): void {
    this.isIframeLoading.set(true);
    this.activeTrackEmbedUrl.set(null);
    this.activeTrackName.set(null);
  }

  openSpotifyDirect(): void {
    window.open(this.currentChannel().directUrl, '_blank', 'noopener,noreferrer');
  }

  openTrackDirect(track: AlbumTrack): void {
    window.open(track.directUrl, '_blank', 'noopener,noreferrer');
  }

  openSpotifyLogin(): void {
    window.open('https://accounts.spotify.com/login', '_blank', 'noopener,noreferrer');
  }
}
