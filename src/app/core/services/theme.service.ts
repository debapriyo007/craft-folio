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

  toggleTheme(event?: MouseEvent | TouchEvent | Event): void {
    const next = this.currentTheme() === 'dark' ? 'light' : 'dark';

    if (!this.isBrowser) {
      this.currentTheme.set(next);
      return;
    }

    const doc = document as any;

    // Check if View Transition API is supported and user does not prefer reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    if (!doc.startViewTransition || prefersReducedMotion) {
      // Fallback: smooth full-DOM CSS transition for browsers/devices without View Transitions
      if (!prefersReducedMotion) {
        document.documentElement.classList.add('theme-transition-fallback');
        setTimeout(() => {
          document.documentElement.classList.remove('theme-transition-fallback');
        }, 550);
      }
      this.applyTheme(next);
      this.currentTheme.set(next);
      return;
    }

    // Determine the precise origin coordinates (x, y) for the circular wave
    // Accurately locate the toggle button element across all screen sizes (desktop, tablet, mobile)
    let x: number;
    let y: number;

    const targetBtn =
      (event?.currentTarget as HTMLElement)?.closest?.('button') ||
      (event?.target as HTMLElement)?.closest?.('button') ||
      (document.querySelector('app-theme-toggle .theme-toggle-btn') as HTMLElement | null);

    if (targetBtn) {
      const rect = targetBtn.getBoundingClientRect();
      x = Math.round(rect.left + rect.width / 2);
      y = Math.round(rect.top + rect.height / 2);
    } else if (
      event &&
      'clientX' in event &&
      typeof (event as MouseEvent).clientX === 'number' &&
      (event as MouseEvent).clientX > 0
    ) {
      x = (event as MouseEvent).clientX;
      y = (event as MouseEvent).clientY;
    } else {
      // Fallback coordinate near top-right where action buttons sit
      x = window.innerWidth - 36;
      y = 36;
    }

    // Calculate maximum radius to the furthest screen corner, with 10% safety margin for rounded mobile display corners
    const maxX = Math.max(x, window.innerWidth - x);
    const maxY = Math.max(y, window.innerHeight - y);
    const endRadius = Math.ceil(Math.hypot(maxX, maxY) * 1.1);

    // Start View Transition
    const transition = doc.startViewTransition(() => {
      this.applyTheme(next);
      this.currentTheme.set(next);
    });

    transition.ready
      .then(() => {
        // Smooth material easing curve: starts gracefully, glides across the layout, and settles smoothly.
        // Duration: 750ms with 40ms staging delay gives a breathtaking, clearly visible circular reveal.
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 750,
            delay: 40,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'both',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => {
        // Fallback safety if animation fails
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
