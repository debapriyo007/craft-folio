import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with a theme mode', () => {
    const current = service.currentTheme();
    expect(['light', 'dark']).toContain(current);
  });

  it('should explicitly set theme', () => {
    service.setTheme('dark');
    expect(service.currentTheme()).toBe('dark');

    service.setTheme('light');
    expect(service.currentTheme()).toBe('light');
  });

  it('should toggle theme from current state', () => {
    service.setTheme('dark');
    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');

    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');
  });
});
