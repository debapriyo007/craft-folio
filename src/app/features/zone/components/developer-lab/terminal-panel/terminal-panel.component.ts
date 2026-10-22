import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminalLog } from '@core/models';

@Component({
  selector: 'app-terminal-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal-panel.component.html',
  styleUrl: './terminal-panel.component.css',
})
export class TerminalPanelComponent implements OnInit {
  @ViewChild('terminalInput') inputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('terminalOutput') outputRef?: ElementRef<HTMLDivElement>;

  readonly logs = signal<TerminalLog[]>([]);
  commandText = '';

  readonly quickCommands = ['help', 'about', 'projects', 'skills', 'clear'];

  ngOnInit(): void {
    this.logs.set([
      {
        id: 1,
        type: 'system',
        text: 'SANCTUARY OS v2.5.0 [x86_64-sanctuary-net]',
      },
      {
        id: 2,
        type: 'system',
        text: 'Type "help" or click quick chips below to query system registries.',
      },
      {
        id: 3,
        type: 'output',
        text: 'Session authenticated: Debapriya Das [Software Engineer // Backend Specialist]',
      },
    ]);
  }

  runCommand(cmd?: string): void {
    const raw = (cmd !== undefined ? cmd : this.commandText).trim();
    if (!raw) return;

    this.commandText = '';
    const lower = raw.toLowerCase();

    // Add input log
    const inputLog: TerminalLog = {
      id: Date.now(),
      type: 'input',
      text: raw,
    };

    if (lower === 'clear') {
      this.logs.set([]);
      return;
    }

    let result = '';
    switch (lower) {
      case 'help':
        result = `Available commands:\n  help      - Print this registry reference\n  about     - Developer lore, background, and specializations\n  projects  - Inspect featured production systems and tools\n  skills    - List core backend & fullstack technical stack\n  clear     - Wipe current terminal screen buffer\n  whoami    - Print active user identity`;
        break;

      case 'about':
        result = `DEBAPRIYA DAS // BACKEND & FULLSTACK ARCHITECT\nExperience: Software Engineer specializing in scalable enterprise distributed architectures.\nCore: Java 21, Spring Boot, Spring Cloud, Kafka, Docker, Kubernetes, PostgreSQL.\nCraft: High-throughput microservices, clean OOP paradigms, event-driven pipelines.`;
        break;

      case 'projects':
        result = `FEATURED SYSTEMS:\n1. ApplyDrive     - Job tracking & career application management system\n2. ByteBlogs      - High-performance developer community blogging platform\n3. GitHubSearcher - Rapid explorer utilizing GitHub REST APIs\n4. PassOp         - End-to-end encrypted local credential repository`;
        break;

      case 'skills':
        result = `SKILL MATRIX:\n[BACKEND]   Java 21, Spring Boot, Spring Security, Microservices, REST APIs, Kafka\n[DATABASES] PostgreSQL, MySQL, MongoDB, Redis\n[FRONTEND]  Angular 22, TypeScript, Responsive CSS, TailwindCSS\n[DEVOPS]    Docker, Git, CI/CD Actions, Linux, Postman`;
        break;

      case 'whoami':
        result = `debapriya@sanctuary-terminal (UID: 1000, GID: 1000) [Admin / Adventurer]`;
        break;

      default:
        result = `Command not recognized: "${raw}". Type "help" for a list of valid commands.`;
        break;
    }

    const outputLog: TerminalLog = {
      id: Date.now() + 1,
      type:
        lower === 'help' || lower === 'about' || lower === 'projects' || lower === 'skills'
          ? 'output'
          : 'error',
      text: result,
    };

    this.logs.update((current) => [...current, inputLog, outputLog]);

    setTimeout(() => {
      if (this.outputRef) {
        this.outputRef.nativeElement.scrollTop = this.outputRef.nativeElement.scrollHeight;
      }
    }, 50);
  }

  focusInput(): void {
    this.inputRef?.nativeElement.focus();
  }
}
