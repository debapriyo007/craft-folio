import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioDataService } from '@core/services';
import { ThemeToggleComponent } from '@shared/components';

@Component({
  selector: 'app-zone-header',
  standalone: true,
  imports: [ThemeToggleComponent],
  templateUrl: './zone-header.component.html',
  styleUrl: './zone-header.component.css',
})
export class ZoneHeaderComponent {
  private readonly router = inject(Router);
  private readonly portfolioService = inject(PortfolioDataService);

  readonly profile = this.portfolioService.profile;

  returnToPortfolio(): void {
    this.router.navigate(['/']);
  }
}
