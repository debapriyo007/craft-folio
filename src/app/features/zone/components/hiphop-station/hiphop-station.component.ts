import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HIPHOP_DATA } from '@core/data/zone-data';
import { CurrentlyListening, HipHopArtist } from '@core/models';
import { SpotifyEmbedComponent } from './spotify-embed/spotify-embed.component';

@Component({
  selector: 'app-hiphop-station',
  standalone: true,
  imports: [CommonModule, SpotifyEmbedComponent],
  templateUrl: './hiphop-station.component.html',
  styleUrl: './hiphop-station.component.css',
})
export class HipHopStationComponent {
  readonly artists: HipHopArtist[] = HIPHOP_DATA.artists;
  readonly currentTrack: CurrentlyListening = HIPHOP_DATA.currentlyListening;
  readonly selectedArtist = signal<HipHopArtist | null>(null);

  openArtistDetail(artist: HipHopArtist): void {
    this.selectedArtist.set(artist);
  }

  closeArtistDetail(): void {
    this.selectedArtist.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedArtist()) {
      this.closeArtistDetail();
    }
  }
}
