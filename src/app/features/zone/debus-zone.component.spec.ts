import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { DebusZoneComponent } from './debus-zone.component';

describe('DebusZoneComponent', () => {
  let component: DebusZoneComponent;
  let fixture: ComponentFixture<DebusZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebusZoneComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DebusZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create Debu's Zone component", () => {
    expect(component).toBeTruthy();
  });

  it("should display DEBU'S ZONE title and subtitle", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.zone-title');
    const subtitle = compiled.querySelector('.zone-subtitle');

    expect(title?.textContent).toContain("DEBU'S ZONE");
    expect(subtitle?.textContent).toContain('Beyond the code. Into my world.');
  });

  it('should render 3 interactive room modules in room-scene', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const roomObjects = compiled.querySelectorAll('.room-object-card');
    expect(roomObjects.length).toBe(3);
  });

  it('should render all 3 active feature module sections and exclude gaming, sports, and art gallery', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#developer-lab')).toBeTruthy();
    expect(compiled.querySelector('#hiphop-station')).toBeTruthy();
    expect(compiled.querySelector('#anime-watchlist')).toBeTruthy();
    expect(compiled.querySelector('#art-gallery')).toBeFalsy();
    expect(compiled.querySelector('#gaming-corner')).toBeFalsy();
    expect(compiled.querySelector('#sports-arena')).toBeFalsy();
  });
});
