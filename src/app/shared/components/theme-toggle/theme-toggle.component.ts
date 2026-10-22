import { Component, inject } from '@angular/core';
import { ThemeService } from '@core/services';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);

  get isDark(): boolean {
    return this.themeService.currentTheme() === 'dark';
  }

  toggle(event?: MouseEvent | TouchEvent | Event): void {
    this.themeService.toggleTheme(event);
  }
}
