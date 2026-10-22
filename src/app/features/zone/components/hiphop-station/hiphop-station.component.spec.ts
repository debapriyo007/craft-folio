import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HipHopStationComponent } from './hiphop-station.component';

describe('HipHopStationComponent', () => {
  let component: HipHopStationComponent;
  let fixture: ComponentFixture<HipHopStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HipHopStationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HipHopStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render all 4 core hip-hop artists', () => {
    expect(component.artists.length).toBe(4);
    const names = component.artists.map((a) => a.name);
    expect(names).toContain('2Pac');
    expect(names).toContain('Eminem');
    expect(names).toContain('Kendrick Lamar');
    expect(names).toContain('50 Cent');
  });

  it('should open and close artist dossier modal', () => {
    expect(component.selectedArtist()).toBeNull();
    component.openArtistDetail(component.artists[0]);
    expect(component.selectedArtist()).toBe(component.artists[0]);

    component.closeArtistDetail();
    expect(component.selectedArtist()).toBeNull();
  });
});
