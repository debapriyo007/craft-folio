import { Component, computed, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ANIME_DATA } from '@core/data/zone-data';
import { AnimeFilter, AnimeItem } from '@core/models';

@Component({
  selector: 'app-anime-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-watchlist.component.html',
  styleUrl: './anime-watchlist.component.css',
})
export class AnimeWatchlistComponent {
  readonly animeList: AnimeItem[] = ANIME_DATA;
  readonly activeFilter = signal<AnimeFilter>('ALL');
  readonly selectedAnime = signal<AnimeItem | null>(null);

  readonly filteredAnime = computed(() => {
    const filter = this.activeFilter();
    const list =
      filter === 'ALL'
        ? this.animeList
        : this.animeList.filter((item) => item.status === filter);

    return [...list].sort((a, b) => {
      const rA = parseFloat(a.rating.replace('/10', '')) || 0;
      const rB = parseFloat(b.rating.replace('/10', '')) || 0;
      return rB - rA;
    });
  });

  readonly loadedImages = signal<Record<string, boolean>>({});

  onPosterLoaded(id: string): void {
    this.loadedImages.update((curr) => ({ ...curr, [id]: true }));
  }

  isPosterLoaded(id: string): boolean {
    return Boolean(this.loadedImages()[id]);
  }

  handlePosterError(event: Event, item: AnimeItem): void {
    const target = event.target as HTMLImageElement;
    if (!target) return;
    if (item.fallbackPoster && target.src !== item.fallbackPoster) {
      target.src = item.fallbackPoster;
    } else if (!target.src.includes('anime-placeholder.svg')) {
      target.src = 'assets/images/anime/anime-placeholder.svg';
    }
  }

  setFilter(filter: AnimeFilter): void {
    this.activeFilter.set(filter);
  }

  openDetail(item: AnimeItem): void {
    this.selectedAnime.set(item);
  }

  closeDetail(): void {
    this.selectedAnime.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedAnime()) {
      this.closeDetail();
    }
  }
}
