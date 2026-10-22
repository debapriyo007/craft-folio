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

  it('should create and have initial system logs', () => {
    expect(component).toBeTruthy();
    expect(component.logs().length).toBeGreaterThan(0);
  });

  it('should execute help command and render available commands', () => {
    component.runCommand('help');
    const logs = component.logs();
    const lastLog = logs[logs.length - 1];
    expect(lastLog.text).toContain('Available commands:');
  });

  it('should clear terminal when clear command is executed', () => {
    component.runCommand('clear');
    expect(component.logs().length).toBe(0);
  });
});
