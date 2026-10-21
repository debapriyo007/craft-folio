import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeMode } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly currentTheme = signal<ThemeMode>(this.getInitialTheme());

  constructor() {
    if (this.isBrowser) {
      effect(() => {
        const theme = this.currentTheme();
        this.applyTheme(theme);
        this.saveTheme(theme);
      });

      // Listen for system theme changes if user hasn't explicitly stored a choice
      try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
            this.currentTheme.set(e.matches ? 'dark' : 'light');
          }
        });
      } catch {
        // matchMedia not supported or restricted
      }
    }
  }

  toggleTheme(event?: MouseEvent): void {
    const next = this.currentTheme() === 'dark' ? 'light' : 'dark';

    if (!this.isBrowser) {
      this.currentTheme.set(next);
      return;
    }

    const doc = document as any;
    // If View Transition API is not supported or user prefers reduced motion, toggle directly
    if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.currentTheme.set(next);
      return;
    }

    const x = event?.clientX ?? window.innerWidth - 60;
    const y = event?.clientY ?? 40;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => {
      this.applyTheme(next);
      this.currentTheme.set(next);
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 480,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => {
        // Fallback if animation fails
      });
  }

  setTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
  }

  private getInitialTheme(): ThemeMode {
    if (!this.isBrowser) return 'light';

    try {
      const stored = localStorage.getItem('theme') as ThemeMode | null;
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

  private applyTheme(theme: ThemeMode): void {
    if (!this.isBrowser) return;
    try {
      document.documentElement.dataset['theme'] = theme;
      const meta = document.querySelector('meta[name="color-scheme"]');
      if (meta) {
        meta.setAttribute('content', theme);
      }
    } catch {
      // safe fallback
    }
  }

  private saveTheme(theme: ThemeMode): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage restricted
    }
  }
}
