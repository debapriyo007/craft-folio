import { TestBed } from '@angular/core/testing';
import { PortfolioDataService } from './portfolio-data.service';

describe('PortfolioDataService', () => {
  let service: PortfolioDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide profile details', () => {
    const profile = service.profile();
    expect(profile.name).toBe('Debapriya Das');
    expect(profile.githubUsername).toBe('debapriyo007');
    expect(profile.avatar).toBeTruthy();
  });

  it('should provide education history', () => {
    const education = service.education();
    expect(education.length).toBeGreaterThan(0);
    expect(education[0].institution).toContain('Bengal Institute Of Technology');
  });

  it('should provide skills breakdown', () => {
    const skills = service.skills();
    expect(skills.length).toBeGreaterThan(0);
    expect(skills.some((s) => s.name === 'Java')).toBe(true);
    expect(skills.some((s) => s.name === 'SpringBoot')).toBe(true);
  });

  it('should provide featured projects', () => {
    const projects = service.projects();
    expect(projects.length).toBeGreaterThanOrEqual(5);
    expect(projects.some((p) => p.id === 'bytesblogs-fullstack-java')).toBe(true);
    expect(projects.some((p) => p.id === 'apply-drive-java-fullstack')).toBe(true);
  });
});
