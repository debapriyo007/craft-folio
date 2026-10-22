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
    if (filter === 'ALL') return this.animeList;
    return this.animeList.filter((item) => item.status === filter);
  });

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
