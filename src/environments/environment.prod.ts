import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  appName: 'Debu Portfolio',
  version: '1.0.0',
  github: {
    username: 'debapriyo007',
    apiBaseUrl: 'https://api.github.com',
    pinnedRepos: [
      'bytesblogs-fullstack-java',
      'apply-drive-java-fullstack',
      'EMS-using-SpringBoot',
      'prescriptio-vault',
      'java-DSA',
      'OOps',
      'Java-Template-Snippet-For-CP',
      'e-Voting',
    ],
  },
  author: {
    name: 'Debapriya Das',
    role: 'Software Developer | Full Stack Java Engineer',
    websiteUrl: 'https://debu21.netlify.app/',
    githubUrl: 'https://github.com/debapriyo007',
  },
};
