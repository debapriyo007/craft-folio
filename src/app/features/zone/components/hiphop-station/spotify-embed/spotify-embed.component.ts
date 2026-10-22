import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface SpotifyChannel {
  id: string;
  name: string;
  badge: string;
  embedUrl: string;
  directUrl: string;
  description: string;
}

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
      id: 'eminem-hits',
      name: 'EMINEM // RECOVERY',
      badge: '🎙️ RECOVERY',
      embedUrl: 'https://open.spotify.com/embed/album/3PogVmhNucYNfyywZvTd7F?utm_source=generator',
      directUrl: 'https://open.spotify.com/album/3PogVmhNucYNfyywZvTd7F',
      description:
        'Recovery (2010) — Not Afraid, Love The Way You Lie, No Love, Cinderella Man, Space Bound.',
    },
    {
      id: 'kendrick-hits',
      name: 'KENDRICK // PGLANG',
      badge: '💿 PGLANG',
      embedUrl: 'https://open.spotify.com/embed/artist/2YZyLoL8N0Wb9xBt1NhZWg?utm_source=generator',
      directUrl: 'https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg',
      description:
        'Official Kendrick Lamar top tracks: HUMBLE., Alright, DNA., Money Trees, Swimming Pools.',
    },
    {
      id: '50cent-hits',
      name: '50 CENT // ESSENTIALS',
      badge: '💎 G-UNIT',
      embedUrl: 'https://open.spotify.com/embed/artist/3q7HBObVc0L8jNeTe5Gofh?utm_source=generator',
      directUrl: 'https://open.spotify.com/artist/3q7HBObVc0L8jNeTe5Gofh',
      description:
        'Official 50 Cent essentials: In Da Club, Many Men, 21 Questions, P.I.M.P., Window Shopper.',
    },
  ];

  readonly activeChannelId = signal<string>('eminem-hits');
  readonly isExpanded = signal<boolean>(true);

  readonly currentChannel = computed(() => {
    const id = this.activeChannelId();
    return this.channels.find((c) => c.id === id) || this.channels[0];
  });

  readonly safeUrl = computed<SafeResourceUrl>(() => {
    const url = this.currentChannel().embedUrl;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  selectChannel(channelId: string): void {
    this.activeChannelId.set(channelId);
  }

  toggleViewMode(): void {
    this.isExpanded.update((v) => !v);
  }

  openSpotifyDirect(): void {
    window.open(this.currentChannel().directUrl, '_blank', 'noopener,noreferrer');
  }
}
