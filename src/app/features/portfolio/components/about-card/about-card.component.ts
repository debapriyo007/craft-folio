import { Component, inject } from '@angular/core';
import { PortfolioDataService } from '@core/services';

@Component({
  selector: 'app-about-card',
  standalone: true,
  templateUrl: './about-card.component.html',
  styleUrl: './about-card.component.css',
})
export class AboutCardComponent {
  private readonly portfolioService = inject(PortfolioDataService);
  readonly profile = this.portfolioService.profile;
}
