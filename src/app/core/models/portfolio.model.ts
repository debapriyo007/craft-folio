export type PortfolioTab = 'resume' | 'projects' | 'github';

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  grade: string;
}

export interface SkillItem {
  name: string;
  icon: string;
  category: 'languages' | 'frameworks' | 'databases' | 'tools';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  liveUrl: string;
  githubUrl: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  about: string;
  location: string;
  educationShort: string;
  githubUsername: string;
  githubUrl: string;
  website: string;
  websiteUrl: string;
  resumePdfUrl: string;
}
