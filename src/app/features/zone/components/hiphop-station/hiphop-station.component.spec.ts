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

  it('should create hip-hop station component', () => {
    expect(component).toBeTruthy();
  });

  it('should render section title and spotify embed', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.section-title');
    expect(title?.textContent).toContain('HIP-HOP STATION');

    const spotifyWrap = compiled.querySelector('.spotify-section-wrap');
    expect(spotifyWrap).toBeTruthy();
  });
});
