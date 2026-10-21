import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitHubApiRepo, GitHubRepoCard } from '../models';
import { environment } from '@env';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly username = environment.github.username;
  private readonly apiBaseUrl = environment.github.apiBaseUrl;
  private readonly pinnedRepoNames = environment.github.pinnedRepos;

  readonly repos = signal<GitHubRepoCard[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);

  private readonly languageColors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    Python: '#3572A5',
    'C++': '#f34b7d',
    C: '#555555',
    Shell: '#89e051',
    Vue: '#41b883',
    Dart: '#00B4AB',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Kotlin: '#A97BFF',
    Swift: '#F05138',
  };

  fetchRepositories(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const url = `${this.apiBaseUrl}/users/${this.username}/repos?per_page=100&sort=updated`;

    this.http
      .get<GitHubApiRepo[]>(url, {
        headers: { Accept: 'application/vnd.github+json' },
      })
      .pipe(
        map((apiRepos) => this.processRepos(apiRepos)),
        catchError((err) => {
          console.error('Error fetching GitHub repos:', err);
          this.errorMessage.set('GitHub repositories are unavailable right now.');
          this.isLoading.set(false);
          return of([]);
        }),
      )
      .subscribe((sortedCards) => {
        this.repos.set(sortedCards);
        this.isLoading.set(false);
      });
  }

  private processRepos(repos: GitHubApiRepo[]): GitHubRepoCard[] {
    return repos
      .filter((repo) => !repo.fork && !repo.archived)
      .map((repo) => {
        const isPinned = this.getPinnedIndex(repo.name) !== -1;
        return {
          id: repo.id,
          name: repo.name,
          url: repo.html_url,
          description: repo.description || 'No description added yet.',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          languageColor: (repo.language && this.languageColors[repo.language]) || '#8b949e',
          topics: (repo.topics || []).slice(0, 4),
          isPinned,
        };
      })
      .sort((a, b) => {
        const aPinnedIndex = this.getPinnedIndex(a.name);
        const bPinnedIndex = this.getPinnedIndex(b.name);
        const aIsPinned = aPinnedIndex !== -1;
        const bIsPinned = bPinnedIndex !== -1;

        if (aIsPinned && bIsPinned) return aPinnedIndex - bPinnedIndex;
        if (aIsPinned) return -1;
        if (bIsPinned) return 1;

        if (b.stars !== a.stars) {
          return b.stars - a.stars;
        }
        return b.forks - a.forks;
      });
  }

  private getPinnedIndex(name: string): number {
    return this.pinnedRepoNames.findIndex((pinned) => pinned.toLowerCase() === name.toLowerCase());
  }
}
