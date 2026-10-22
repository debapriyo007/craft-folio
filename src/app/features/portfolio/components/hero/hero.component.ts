import { Component, inject, signal } from '@angular/core';
import { PortfolioDataService } from '@core/services';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  private readonly portfolioService = inject(PortfolioDataService);
  readonly profile = this.portfolioService.profile;
  readonly isWaving = signal(false);

  triggerWave(): void {
    this.isWaving.set(true);
    setTimeout(() => this.isWaving.set(false), 800);
  }
}
