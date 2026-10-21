import { Component, OnInit, OnDestroy, signal, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.css',
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly isVisible = signal<boolean>(false);
  readonly isHovered = signal<boolean>(false);
  readonly isClicking = signal<boolean>(false);

  private mouseX = -100;
  private mouseY = -100;
  private currentX = -100;
  private currentY = -100;

  private animFrameId: number | null = null;
  private boundOnMouseMove: ((e: MouseEvent) => void) | null = null;
  private boundOnMouseDown: (() => void) | null = null;
  private boundOnMouseUp: (() => void) | null = null;
  private boundOnMouseLeave: (() => void) | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Check if device has fine pointer (mouse / trackpad)
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      if (window.matchMedia('(pointer: coarse)').matches) {
        return;
      }
    }

    this.setupListeners();
    this.startAnimationLoop();
  }

  ngOnDestroy(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    this.removeListeners();
  }

  private setupListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      this.boundOnMouseMove = (e: MouseEvent) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        if (!this.isVisible()) {
          this.currentX = this.mouseX;
          this.currentY = this.mouseY;
          this.ngZone.run(() => this.isVisible.set(true));
        }

        // Check if hovering over interactive elements
        const target = e.target as HTMLElement | null;
        if (target) {
          const isInteractive = Boolean(
            target.closest(
              'a, button, [role="button"], [role="tab"], input, textarea, select, .glass-tab-btn, .glass-pill-btn, .action-btn, .repo-btn, .theme-toggle-btn',
            ),
          );
          if (isInteractive !== this.isHovered()) {
            this.ngZone.run(() => this.isHovered.set(isInteractive));
          }
        }
      };

      this.boundOnMouseDown = () => {
        this.ngZone.run(() => this.isClicking.set(true));
      };

      this.boundOnMouseUp = () => {
        this.ngZone.run(() => this.isClicking.set(false));
      };

      this.boundOnMouseLeave = () => {
        this.ngZone.run(() => this.isVisible.set(false));
      };

      window.addEventListener('mousemove', this.boundOnMouseMove, { passive: true });
      window.addEventListener('mousedown', this.boundOnMouseDown);
      window.addEventListener('mouseup', this.boundOnMouseUp);
      document.addEventListener('mouseleave', this.boundOnMouseLeave);
    });
  }

  private removeListeners(): void {
    if (this.boundOnMouseMove) window.removeEventListener('mousemove', this.boundOnMouseMove);
    if (this.boundOnMouseDown) window.removeEventListener('mousedown', this.boundOnMouseDown);
    if (this.boundOnMouseUp) window.removeEventListener('mouseup', this.boundOnMouseUp);
    if (this.boundOnMouseLeave) document.removeEventListener('mouseleave', this.boundOnMouseLeave);
  }

  private startAnimationLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      const cursorEl = document.getElementById('flag-cursor');

      const loop = () => {
        // High responsive lerp for fluid lag-free cursor tracking
        this.currentX += (this.mouseX - this.currentX) * 0.42;
        this.currentY += (this.mouseY - this.currentY) * 0.42;

        if (cursorEl) {
          // Align top golden spearhead directly at mouse point
          cursorEl.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
        }

        this.animFrameId = requestAnimationFrame(loop);
      };

      this.animFrameId = requestAnimationFrame(loop);
    });
  }
}
