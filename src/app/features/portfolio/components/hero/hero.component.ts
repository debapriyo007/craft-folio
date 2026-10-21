import { Component, inject } from '@angular/core';
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
}
