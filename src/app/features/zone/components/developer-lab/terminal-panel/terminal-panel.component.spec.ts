import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminalPanelComponent } from './terminal-panel.component';

describe('TerminalPanelComponent', () => {
  let component: TerminalPanelComponent;
  let fixture: ComponentFixture<TerminalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.stopAutoTyping();
  });

  it('should create and initialize auto-typing', () => {
    expect(component).toBeTruthy();
    expect(component.isAutoTyping()).toBe(true);
  });

  it('should execute whoami command and return user identity', () => {
    component.runCommand('whoami');
    const logs = component.logs();
    const lastLog = logs[logs.length - 1];
    expect(lastLog.text).toBe('Debapriya Das');
    expect(lastLog.outputColor).toBe('cyan');
  });

  it('should execute personal-details command and render personal table', () => {
    component.runCommand('personal-details');
    const logs = component.logs();
    const lastLog = logs[logs.length - 1];
    expect(lastLog.type).toBe('table');
    expect(lastLog.tableTitle).toBe('Personal Details');
    expect(lastLog.tableRows?.length).toBeGreaterThan(0);
    const nameRow = lastLog.tableRows?.find((r) => r.title === 'Name');
    expect(nameRow?.count).toBe('Debapriya Das');
    const cgpaRow = lastLog.tableRows?.find((r) => r.title === 'CGPA');
    expect(cgpaRow?.count).toBe('8.23');
    const schoolRow = lastLog.tableRows?.find((r) => r.title === 'School');
    expect(schoolRow?.count).toBe('Jharia Sri Ramkrishna Vidyapith');
  });

  it('should execute uptime and exit commands', () => {
    component.runCommand('uptime');
    let logs = component.logs();
    expect(logs[logs.length - 1].text).toBe('1352');

    component.runCommand('exit');
    logs = component.logs();
    expect(logs[logs.length - 1].text).toBe('exit');
  });

  it('should execute help command and render available commands', () => {
    component.runCommand('help');
    const logs = component.logs();
    const lastLog = logs[logs.length - 1];
    expect(lastLog.text).toContain('Available commands:');
  });

  it('should execute projects command and render projects table', () => {
    component.runCommand('projects');
    const logs = component.logs();
    const lastLog = logs[logs.length - 1];
    expect(lastLog.type).toBe('table');
    expect(lastLog.tableTitle).toBe('Featured Projects');
    expect(lastLog.tableRows?.length).toBeGreaterThan(0);
  });

  it('should execute favourite-songs and favourite-anime commands', () => {
    component.runCommand('favourite-songs');
    let logs = component.logs();
    expect(logs[logs.length - 1].tableTitle).toContain('Favourite Songs');

    component.runCommand('favourite-anime');
    logs = component.logs();
    expect(logs[logs.length - 1].tableTitle).toContain('Favourite Anime');
  });

  it('should clear terminal when clear command is executed', () => {
    component.runCommand('clear');
    expect(component.logs().length).toBe(0);
    expect(component.isAutoTyping()).toBe(false);
  });
});
