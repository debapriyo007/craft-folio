import { Injectable, signal } from '@angular/core';
import { ProfileInfo, EducationItem, SkillItem, ProjectItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  readonly profile = signal<ProfileInfo>({
    name: 'Debapriya Das',
    title: 'Software Developer | Full Stack Java Engineer',
    avatar: 'assets/images/debu_minecraft_avatar.jpg',
    bio: "I'm a computer science student from Bengal Institute Of Technology. Who wants to be a passionate Software Developer and eager to learn new things.",
    about:
      "A computer science student from Bengal Institute Of Technology. Who wants to be a passionate Software Developer eager to learn new things. I am driven by curiosity and proficient in Java, JavaScript and I'm also a Frontend Developer.",
    location: 'Arambagh, Hugli',
    educationShort: 'Bengal Institute Of Technology',
    githubUsername: 'debapriyo007',
    githubUrl: 'https://github.com/debapriyo007',
    website: 'www.debu-21.com',
    websiteUrl: 'https://debu21.netlify.app/',
    resumePdfUrl: 'assets/images/debapriya_dasv1.4.pdf',
  });

  readonly education = signal<EducationItem[]>([
    {
      institution: 'Bengal Institute Of Technology - Kolkata (CSE)',
      degree: 'B.Tech in Computer Science & Engineering',
      period: '2021 - 2025',
      grade: '8.23 CGPA',
    },
    {
      institution: 'Jharia Sri Ramkrishna Vidyapith - Hooghly (Science - XII)',
      degree: 'Higher Secondary Examination',
      period: '2019 - 2021',
      grade: '90%',
    },
    {
      institution: 'Jharia Sri Ramkrishna Vidyapith - Hooghly (Class - X)',
      degree: 'Secondary Examination',
      period: '2009 - 2019',
      grade: '82%',
    },
  ]);

  readonly skills = signal<SkillItem[]>([
    { name: 'Java', icon: 'assets/images/icons8-java-188.png', category: 'languages' },
    {
      name: 'SpringBoot',
      icon: 'assets/images/icons8-spring-boot-500.png',
      category: 'frameworks',
    },
    { name: 'JavaScript', icon: 'assets/images/javascript.svg', category: 'languages' },
    { name: 'HTML5', icon: 'assets/images/html5.svg', category: 'languages' },
    { name: 'CSS3', icon: 'assets/images/css3.svg', category: 'languages' },
    { name: 'React Js', icon: 'assets/images/react.js.svg', category: 'frameworks' },
    { name: 'Node Js', icon: 'assets/images/node.js.svg', category: 'frameworks' },
    { name: 'My SQL', icon: 'assets/images/mysql.svg', category: 'databases' },
    { name: 'MongoDB', icon: 'assets/images/mongodb.svg', category: 'databases' },
    { name: 'GitHub', icon: 'assets/images/icons8-github-240.png', category: 'tools' },
    { name: 'Git', icon: 'assets/images/icons8-git-96.png', category: 'tools' },
    { name: 'VS Code', icon: 'assets/images/vs_code.svg', category: 'tools' },
    {
      name: 'IntelliJ IDEA',
      icon: 'assets/images/icons8-intellij-idea-240.png',
      category: 'tools',
    },
    { name: 'Postman', icon: 'assets/images/postman.png', category: 'tools' },
  ]);

  readonly projects = signal<ProjectItem[]>([
    {
      id: 'bytesblogs-fullstack-java',
      title: 'BytesBlogs - Java Full Stack',
      category: 'Java Full Stack',
      description:
        'Secure full-stack developer blogging platform built with Spring Boot (Java 25), Spring Security, OAuth2, Docker, and MySQL.',
      thumbnail: 'assets/images/mc-project-bytesblogs.jpg',
      liveUrl: 'https://bytesblogs.up.railway.app/',
      githubUrl: 'https://github.com/debapriyo007/bytesblogs-fullstack-java',
    },
    {
      id: 'pass-op',
      title: 'PassOp - Password Manager',
      category: 'Web App',
      description:
        'A password manager for saving website credentials locally with a simple and focused interface.',
      thumbnail: 'assets/images/mc-project-passop.jpg',
      liveUrl: 'https://passop-debu.netlify.app/',
      githubUrl: 'https://github.com/debapriyo007/Password-Manager',
    },
    {
      id: 'github-searcher',
      title: 'GitHub-Searcher - Search App',
      category: 'Web App',
      description:
        'A GitHub profile search tool that displays user information and repository details from GitHub data.',
      thumbnail: 'assets/images/mc-project-githubsearcher.jpg',
      liveUrl: 'https://debapriyo007.github.io/github-searcher/',
      githubUrl: 'https://github.com/debapriyo007/github-searcher',
    },
    {
      id: 'todo-app',
      title: 'Todo App - Web App',
      category: 'Web App',
      description:
        'A task management app for creating, tracking, and organizing daily todos with a lightweight UI.',
      thumbnail: 'assets/images/mc-project-todoapp.jpg',
      liveUrl: 'https://todo-debu.netlify.app',
      githubUrl: 'https://github.com/debapriyo007/Todo',
    },
    {
      id: 'apply-drive-java-fullstack',
      title: 'ApplyDrive - Off-Campus Drive Tracker',
      category: 'Java Full Stack',
      description:
        'Enterprise-grade job aggregator, off-campus career drive compiler, and student internship tracker with Spring Boot, MySQL & React.',
      thumbnail: 'assets/images/mc-project-applydrive.jpg',
      liveUrl: 'https://github.com/debapriyo007/apply-drive-java-fullstack',
      githubUrl: 'https://github.com/debapriyo007/apply-drive-java-fullstack',
    },
  ]);
}
