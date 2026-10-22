import { Injectable, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private audioCtx: AudioContext | null = null;
  private clickBuffer: AudioBuffer | null = null;
  private isMuted = false;
  private isInitialized = false;

  constructor() {
    if (this.isBrowser) {
      this.initGlobalClickListener();
      this.loadAudioBuffer();
    }
  }

  /**
   * Play the crisp Minecraft tactile UI button click sound with dynamic pitch variation
   */
  playClick(pitchMultiplier = 1.0): void {
    if (!this.isBrowser || this.isMuted) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      // If pre-decoded audio buffer is ready, play it with pitch variation
      if (this.clickBuffer) {
        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();

        // Authentic Minecraft pitch randomization (0.92 to 1.08)
        const randomPitch = 0.92 + Math.random() * 0.16;
        source.playbackRate.value = randomPitch * pitchMultiplier;
        source.buffer = this.clickBuffer;

        gainNode.gain.value = 0.42; // Balanced, non-fatiguing volume
        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        source.start(0);
      } else {
        // Fallback: procedural synthesis of Minecraft tactile click
        this.synthesizeProceduralClick(ctx, pitchMultiplier);
      }
    } catch {
      // Audio autoplay policy or hardware restriction
    }
  }

  /**
   * Toggle mute state
   */
  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  get muted(): boolean {
    return this.isMuted;
  }

  private getAudioContext(): AudioContext | null {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    return this.audioCtx;
  }

  private async loadAudioBuffer(): Promise<void> {
    try {
      const response = await fetch('assets/audio/click.wav');
      if (!response.ok) return;
      const arrayBuffer = await response.arrayBuffer();
      const ctx = this.getAudioContext();
      if (ctx) {
        this.clickBuffer = await ctx.decodeAudioData(arrayBuffer);
      }
    } catch {
      // Will gracefully use procedural click synthesizer
    }
  }

  /**
   * Procedural Minecraft tactile click generator (zero latency, zero dependencies)
   */
  private synthesizeProceduralClick(ctx: AudioContext, pitchMultiplier: number): void {
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const randomPitch = 0.92 + Math.random() * 0.16;
    const baseFreq = 1100 * randomPitch * pitchMultiplier;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq * 2.2, t0);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, t0 + 0.04);

    gain.gain.setValueAtTime(0.35, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t0);
    osc.stop(t0 + 0.05);
  }

  /**
   * Global listener: Plays click whenever any interactive button or link is pressed
   */
  private initGlobalClickListener(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener(
        'click',
        (e: MouseEvent) => {
          const target = e.target as HTMLElement | null;
          if (!target) return;

          // Check if clicked element is a button, link, tab, or interactive role
          const isButton = target.closest(
            'button, [role="button"], [role="tab"], .tab-btn, .theme-toggle-btn, .mc-block-btn, .action-btn, .social-chip, .repo-card, a[href]',
          );

          if (isButton) {
            this.playClick();
          }
        },
        { passive: true, capture: true },
      );
    });
  }
}
