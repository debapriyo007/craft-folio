import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimeWatchlistComponent } from './anime-watchlist.component';

describe('AnimeWatchlistComponent', () => {
  let component: AnimeWatchlistComponent;
  let fixture: ComponentFixture<AnimeWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeWatchlistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimeWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter anime by status', () => {
    component.setFilter('WATCHING');
    fixture.detectChanges();
    expect(component.filteredAnime().every((a) => a.status === 'WATCHING')).toBe(true);
    expect(component.filteredAnime().length).toBe(1);
    expect(component.filteredAnime()[0].title).toBe('One Piece');
  });

  it('should have all anime except One Piece marked as COMPLETED', () => {
    component.setFilter('COMPLETED');
    fixture.detectChanges();
    const completed = component.filteredAnime();
    expect(completed.length).toBe(9);
    expect(completed.some((a) => a.title === 'Attack on Titan')).toBe(true);
    expect(completed.some((a) => a.title === 'Naruto')).toBe(true);
    expect(completed.some((a) => a.title === 'One Punch Man')).toBe(true);
    expect(completed.some((a) => a.title === 'Solo Leveling')).toBe(true);
    expect(completed.some((a) => a.title === 'Hunter x Hunter')).toBe(true);
  });

  it('should sort anime in descending order by rating', () => {
    component.setFilter('ALL');
    fixture.detectChanges();
    const list = component.filteredAnime();
    expect(list.length).toBe(10);
    for (let i = 0; i < list.length - 1; i++) {
      const curr = parseFloat(list[i].rating.replace('/10', ''));
      const next = parseFloat(list[i + 1].rating.replace('/10', ''));
      expect(curr).toBeGreaterThanOrEqual(next);
    }
  });

  it('should handle poster error and fallback correctly', () => {
    const item = component.animeList[0];
    const dummyImg = { src: item.poster } as HTMLImageElement;
    const dummyEvent = { target: dummyImg } as unknown as Event;

    component.handlePosterError(dummyEvent, item);
    expect(dummyImg.src).toBe(item.fallbackPoster);

    // Second failure should fall back to placeholder
    component.handlePosterError(dummyEvent, item);
    expect(dummyImg.src).toContain('anime-placeholder.svg');
  });

  it('should open and close detail modal', () => {
    expect(component.selectedAnime()).toBeNull();
    component.openDetail(component.animeList[0]);
    expect(component.selectedAnime()).toBe(component.animeList[0]);

    component.closeDetail();
    expect(component.selectedAnime()).toBeNull();
  });
});
