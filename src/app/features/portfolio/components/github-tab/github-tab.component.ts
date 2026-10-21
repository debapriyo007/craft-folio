import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { GithubService } from '@core/services';

@Component({
  selector: 'app-github-tab',
  standalone: true,
  templateUrl: './github-tab.component.html',
  styleUrl: './github-tab.component.css',
})
export class GithubTabComponent implements OnInit {
  private readonly githubService = inject(GithubService);
  private readonly reposPerPage = 4;

  readonly repos = this.githubService.repos;
  readonly isLoading = this.githubService.isLoading;
  readonly errorMessage = this.githubService.errorMessage;

  readonly visibleCount = signal<number>(this.reposPerPage);

  readonly visibleRepos = computed(() => this.repos().slice(0, this.visibleCount()));

  readonly hasMore = computed(() => this.visibleCount() < this.repos().length);

  ngOnInit(): void {
    if (this.repos().length === 0) {
      this.githubService.fetchRepositories();
    }
  }

  retry(): void {
    this.githubService.fetchRepositories();
  }

  loadMore(): void {
    this.visibleCount.update((count) => count + this.reposPerPage);
  }
}
