import { Component } from '@angular/core';
import { TerminalPanelComponent } from './terminal-panel/terminal-panel.component';

@Component({
  selector: 'app-developer-lab',
  standalone: true,
  imports: [TerminalPanelComponent],
  templateUrl: './developer-lab.component.html',
  styleUrl: './developer-lab.component.css',
})
export class DeveloperLabComponent {}
