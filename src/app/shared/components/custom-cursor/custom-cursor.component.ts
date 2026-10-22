import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  signal,
  inject,
  PLATFORM_ID,
  NgZone,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type CursorType = 'gauntlet' | 'flag';

interface CursorParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.css',
})
export class CustomCursorComponent implements OnInit, AfterViewInit, OnDestroy {
  // =========================================================================
  // 🎯 CURSOR SWITCHER: Change this single word below to switch your cursor!
  // Options: 'gauntlet' (Animated Minecraft Gauntlet) | 'flag' (Animated Indian Flag)
  // =========================================================================
  readonly activeCursor: CursorType = 'gauntlet';

  @ViewChild('particleCanvas') private canvasRef?: ElementRef<HTMLCanvasElement>;

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
  private lastSpawnX = -100;
  private lastSpawnY = -100;

  private animFrameId: number | null = null;
  private particles: CursorParticle[] = [];
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private canvasWidth = 0;
  private canvasHeight = 0;

  private boundOnMouseMove: ((e: MouseEvent) => void) | null = null;
  private boundOnMouseDown: (() => void) | null = null;
  private boundOnMouseUp: (() => void) | null = null;
  private boundOnMouseLeave: (() => void) | null = null;
  private boundOnResize: (() => void) | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Check if device has fine pointer (mouse / trackpad)
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      if (window.matchMedia('(pointer: coarse)').matches) {
        return;
      }
    }

    this.setupListeners();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.setupCanvas();
    this.startAnimationLoop();
  }

  ngOnDestroy(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    this.removeListeners();
  }

  private setupCanvas(): void {
    if (!this.canvasRef?.nativeElement) return;
    const canvas = this.canvasRef.nativeElement;
    try {
      this.canvasCtx = canvas.getContext('2d');
    } catch {
      this.canvasCtx = null;
    }
    this.updateCanvasDimensions();

    this.boundOnResize = () => this.updateCanvasDimensions();
    window.addEventListener('resize', this.boundOnResize, { passive: true });
  }

  private updateCanvasDimensions(): void {
    if (!this.canvasRef?.nativeElement) return;
    const canvas = this.canvasRef.nativeElement;
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
  }

  private setupListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      this.boundOnMouseMove = (e: MouseEvent) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        if (!this.isVisible()) {
          this.currentX = this.mouseX;
          this.currentY = this.mouseY;
          this.lastSpawnX = this.mouseX;
          this.lastSpawnY = this.mouseY;
          this.ngZone.run(() => this.isVisible.set(true));
        }

        // Spawn trailing stardust particles when cursor moves
        const dist = Math.hypot(this.mouseX - this.lastSpawnX, this.mouseY - this.lastSpawnY);
        if (dist > 8) {
          this.spawnTrailParticle(this.mouseX, this.mouseY);
          this.lastSpawnX = this.mouseX;
          this.lastSpawnY = this.mouseY;
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
        // Spawn energetic radial burst particles on click
        this.spawnClickBurst(this.mouseX, this.mouseY);
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
    if (this.boundOnResize) window.removeEventListener('resize', this.boundOnResize);
  }

  /**
   * Spawns cosmic Minecraft enchantment stardust when moving
   */
  private spawnTrailParticle(x: number, y: number): void {
    if (this.particles.length > 50) return; // Pool cap for 60fps performance

    const gauntletColors = [
      '#a855f7',
      '#38bdf8',
      '#ef4444',
      '#f97316',
      '#10b981',
      '#eab308',
      '#ffffff',
    ];
    const flagColors = ['#ff9933', '#ffffff', '#138808', '#000080'];
    const colorPalette = this.activeCursor === 'gauntlet' ? gauntletColors : flagColors;
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

    this.particles.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2 - 0.35, // gentle float upward
      size: Math.floor(Math.random() * 3) + 3, // 3 to 5px crisp Minecraft pixel square
      color,
      alpha: 0.95,
      decay: 0.024 + Math.random() * 0.018,
    });
  }

  /**
   * Spawns a radial cosmic sparkle burst on click (like a critical hit / snap)
   */
  private spawnClickBurst(x: number, y: number): void {
    const burstCount = 10;
    const gauntletColors = ['#eab308', '#f97316', '#ef4444', '#a855f7', '#38bdf8', '#ffffff'];
    const flagColors = ['#ff9933', '#ffffff', '#138808', '#f59e0b'];
    const colorPalette = this.activeCursor === 'gauntlet' ? gauntletColors : flagColors;

    for (let i = 0; i < burstCount; i++) {
      const angle = (i * 2 * Math.PI) / burstCount + (Math.random() - 0.5) * 0.4;
      const speed = 2.2 + Math.random() * 2.8;
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.floor(Math.random() * 3) + 4,
        color,
        alpha: 1.0,
        decay: 0.038 + Math.random() * 0.02,
      });
    }
  }

  private startAnimationLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      const cursorEl =
        document.getElementById('custom-cursor-wrapper') || document.getElementById('flag-cursor');

      const loop = () => {
        // High responsive lerp for fluid lag-free cursor tracking
        this.currentX += (this.mouseX - this.currentX) * 0.44;
        this.currentY += (this.mouseY - this.currentY) * 0.44;

        if (cursorEl) {
          cursorEl.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
        }

        // Render & update particles on canvas
        this.renderParticles();

        this.animFrameId = requestAnimationFrame(loop);
      };

      this.animFrameId = requestAnimationFrame(loop);
    });
  }

  private renderParticles(): void {
    if (!this.canvasCtx || !this.canvasWidth) return;

    const ctx = this.canvasCtx;
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (this.particles.length === 0) return;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.alpha);
      // Crisp Minecraft square pixels
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    }

    ctx.globalAlpha = 1.0;
  }
}
