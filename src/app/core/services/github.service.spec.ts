import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';
import { environment } from '@env';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), GithubService],
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.isLoading()).toBe(true);
  });

  it('should fetch and process pinned repositories', () => {
    service.fetchRepositories();
    expect(service.isLoading()).toBe(true);

    const expectedUrl = `${environment.github.apiBaseUrl}/users/${environment.github.username}/repos?per_page=100&sort=updated`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');

    const mockRepos = [
      {
        id: 1,
        name: 'bytesblogs-fullstack-java',
        description: 'Java blog platform',
        html_url: 'https://github.com/debapriyo007/bytesblogs-fullstack-java',
        homepage: 'https://bytesblogs.up.railway.app/',
        stargazers_count: 5,
        forks_count: 2,
        language: 'Java',
        fork: false,
        archived: false,
        updated_at: '2026-01-01T00:00:00Z',
        topics: ['java', 'spring-boot'],
      },
      {
        id: 2,
        name: 'unpinned-repo',
        description: 'Random test repo',
        html_url: 'https://github.com/debapriyo007/unpinned-repo',
        homepage: null,
        stargazers_count: 0,
        forks_count: 0,
        language: 'JavaScript',
        fork: false,
        archived: false,
        updated_at: '2026-01-01T00:00:00Z',
        topics: [],
      },
    ];

    req.flush(mockRepos);

    expect(service.isLoading()).toBe(false);
    expect(service.repos().length).toBe(2);
    // bytesblogs is in pinnedRepoNames, so it should be marked pinned
    const bytesBlogs = service.repos().find((r) => r.name === 'bytesblogs-fullstack-java');
    expect(bytesBlogs).toBeDefined();
    expect(bytesBlogs?.isPinned).toBe(true);
    expect(bytesBlogs?.languageColor).toBe('#b07219');
  });

  it('should handle API errors gracefully', () => {
    service.fetchRepositories();

    const expectedUrl = `${environment.github.apiBaseUrl}/users/${environment.github.username}/repos?per_page=100&sort=updated`;
    const req = httpMock.expectOne(expectedUrl);
    req.error(new ProgressEvent('Network error'));

    expect(service.isLoading()).toBe(false);
    expect(service.errorMessage()).toContain('GitHub repositories are unavailable');
  });
});
