import { Component, inject, signal, computed } from '@angular/core';
import { PortfolioDataService } from '@core/services';

@Component({
  selector: 'app-projects-tab',
  standalone: true,
  templateUrl: './projects-tab.component.html',
  styleUrl: './projects-tab.component.css',
})
export class ProjectsTabComponent {
  private readonly portfolioService = inject(PortfolioDataService);
  private readonly projectsPerPage = 4;

  readonly allProjects = this.portfolioService.projects;
  readonly visibleCount = signal<number>(this.projectsPerPage);

  readonly visibleProjects = computed(() => this.allProjects().slice(0, this.visibleCount()));

  readonly hasMore = computed(() => this.visibleCount() < this.allProjects().length);

  loadMore(): void {
    this.visibleCount.update((prev) => prev + this.projectsPerPage);
  }
}
