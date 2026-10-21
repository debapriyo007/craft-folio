export interface GitHubApiRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
}

export interface GitHubRepoCard {
  id: number;
  name: string;
  url: string;
  description: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string;
  topics: string[];
  isPinned: boolean;
}
