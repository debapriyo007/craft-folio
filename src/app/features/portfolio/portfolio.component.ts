import { Component, signal } from '@angular/core';
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
export class PortfolioComponent {
  readonly activeTab = signal<PortfolioTab>('resume');

  setTab(tab: PortfolioTab): void {
    this.activeTab.set(tab);
  }
}
