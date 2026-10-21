export interface Environment {
  production: boolean;
  appName: string;
  version: string;
  github: {
    username: string;
    apiBaseUrl: string;
    pinnedRepos: string[];
  };
  author: {
    name: string;
    role: string;
    websiteUrl: string;
    githubUrl: string;
  };
}
