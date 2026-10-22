import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { PortfolioDataService } from '@core/services';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [PortfolioDataService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should render wave emoji with accessible attributes', () => {
    const waveEl: HTMLElement = fixture.nativeElement.querySelector('.hero-wave');
    expect(waveEl).toBeTruthy();
    expect(waveEl.getAttribute('role')).toBe('button');
    expect(waveEl.getAttribute('aria-label')).toBe('Minecraft waving hand emoji');
  });

  it('should trigger celebratory wave on interaction and reset after delay', () => {
    expect(component.isWaving()).toBe(false);
    component.triggerWave();
    expect(component.isWaving()).toBe(true);
    fixture.detectChanges();

    const waveEl: HTMLElement = fixture.nativeElement.querySelector('.hero-wave');
    expect(waveEl.classList.contains('hero-wave-celebrate')).toBe(true);

    vi.advanceTimersByTime(850);
    expect(component.isWaving()).toBe(false);
  });
});
