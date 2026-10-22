import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioTab } from '@core/models';
import { ThemeToggleComponent, FooterComponent } from '@shared/components';
import {
  HeroComponent,
  AboutCardComponent,
  TabNavComponent,
  ResumeTabComponent,
  ProjectsTabComponent,
  GithubTabComponent,
} from './components';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    ThemeToggleComponent,
    HeroComponent,
    AboutCardComponent,
    TabNavComponent,
    ResumeTabComponent,
    ProjectsTabComponent,
    GithubTabComponent,
    FooterComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly activeTab = signal<PortfolioTab>('resume');

  ngOnInit(): void {
    const tabParam = this.route.snapshot.queryParamMap.get('tab') as PortfolioTab;
    if (tabParam && ['resume', 'projects', 'github'].includes(tabParam)) {
      this.activeTab.set(tabParam);
    }
  }

  setTab(tab: PortfolioTab): void {
    if (tab === 'zone') {
      this.router.navigate(['/zone']);
      return;
    }
    this.activeTab.set(tab);
  }
}
