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
  });

  it('should open and close detail modal', () => {
    expect(component.selectedAnime()).toBeNull();
    component.openDetail(component.animeList[0]);
    expect(component.selectedAnime()).toBe(component.animeList[0]);

    component.closeDetail();
    expect(component.selectedAnime()).toBeNull();
  });
});
