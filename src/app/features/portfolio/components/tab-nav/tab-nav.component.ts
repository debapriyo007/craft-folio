import { Component, input, output } from '@angular/core';
import { PortfolioTab } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-tab-nav',
  standalone: true,
  templateUrl: './tab-nav.component.html',
  styleUrl: './tab-nav.component.css',
})
export class TabNavComponent {
  readonly activeTab = input.required<PortfolioTab>();
  readonly tabChange = output<PortfolioTab>();

  readonly tabs: { id: PortfolioTab; label: string; icon: string }[] = [
    { id: 'resume', label: 'Resume', icon: 'file' },
    { id: 'projects', label: 'Projects', icon: 'layers' },
    { id: 'github', label: 'GitHub Repos', icon: 'github' },
  ];

  selectTab(tabId: PortfolioTab): void {
    this.tabChange.emit(tabId);
  }
}
