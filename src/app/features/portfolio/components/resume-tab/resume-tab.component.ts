import { Component, inject } from '@angular/core';
import { PortfolioDataService } from '@core/services';

@Component({
  selector: 'app-resume-tab',
  standalone: true,
  templateUrl: './resume-tab.component.html',
  styleUrl: './resume-tab.component.css',
})
export class ResumeTabComponent {
  private readonly portfolioService = inject(PortfolioDataService);

  readonly education = this.portfolioService.education;
  readonly skills = this.portfolioService.skills;
  readonly profile = this.portfolioService.profile;
}
