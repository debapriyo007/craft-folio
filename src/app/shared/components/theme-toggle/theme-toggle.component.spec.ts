import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '@core/services';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [ThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect theme state in isDark getter', () => {
    themeService.setTheme('dark');
    expect(component.isDark).toBe(true);

    themeService.setTheme('light');
    expect(component.isDark).toBe(false);
  });

  it('should call toggleTheme when button is clicked', () => {
    const toggleSpy = vi.spyOn(themeService, 'toggleTheme');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(toggleSpy).toHaveBeenCalled();
  });
});
