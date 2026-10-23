import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminalLog, TerminalTableRow } from '@core/models';

export const PERSONAL_DETAILS_ROWS: TerminalTableRow[] = [
  { title: 'Name', count: 'Debapriya Das' },
  { title: 'Role', count: 'Full Stack Java Engineer' },
  { title: 'College', count: 'Bengal Institute Of Technology' },
  { title: 'Degree', count: 'B.Tech CSE (2021 - 2025)' },
  { title: 'CGPA', count: '8.23' },
  { title: 'School', count: 'Jharia Sri Ramkrishna Vidyapith' },
  { title: 'Location', count: 'Arambagh, Hugli' },
  { title: 'Core Stack', count: 'Java 21, Spring Boot, Angular' },
  { title: 'Status', count: 'ONLINE // LEVEL 25' },
];

export const PROJECT_ROWS: TerminalTableRow[] = [
  { title: 'BytesBlogs', count: 'Java 25, Spring Boot, MySQL, Docker — Developer Blog Platform' },
  { title: 'PassOp', count: 'Local Credential Vault & Password Manager with Privacy UI' },
  { title: 'GitHubSearcher', count: 'GitHub Profile & Repository Explorer via GitHub REST APIs' },
  { title: 'ApplyDrive', count: 'Java Full Stack Off-Campus Drive & Career Tracker' },
  { title: 'Todo App', count: 'Lightweight Task Management & Daily Productivity App' },
];

export const FAVOURITE_SONGS_ROWS: TerminalTableRow[] = [
  { title: 'Lil Wayne', count: 'King Carter, A Milli, 6 Foot 7 Foot, Mona Lisa, Sharks' },
  { title: 'Eminem', count: 'Not Afraid, Lose Yourself, No Love, Space Bound, Cinderella Man' },
  { title: 'Kendrick Lamar', count: 'HUMBLE., Alright, DNA., Money Trees, Swimming Pools' },
  { title: 'Tha Carter VI', count: 'Welcome to Tha Carter, Bells, Cotton Candy, Maria, Flex Up' },
];

export const FAVOURITE_ANIME_ROWS: TerminalTableRow[] = [
  { title: 'Attack on Titan', count: '10/10 • Levi Ackerman & Erwin Smith' },
  { title: 'Fullmetal Alchemist', count: '9.8/10 • Roy Mustang & Edward Elric' },
  { title: 'Hunter x Hunter', count: '9.7/10 • Killua Zoldyck (Chimera Ant Arc)' },
  { title: 'Vinland Saga', count: '9.6/10 • Askeladd & Thorfinn ("I have no enemies")' },
  { title: 'Death Note', count: '9.5/10 • L Lawliet vs Light Yagami' },
  { title: 'One Piece', count: '9.4/10 • Roronoa Zoro (Grand Line Journey)' },
  { title: 'Naruto', count: '9.3/10 • Itachi Uchiha & Kakashi Hatake' },
  { title: 'Jujutsu Kaisen', count: '9.2/10 • Satoru Gojo (Shibuya Incident)' },
  { title: 'Solo Leveling', count: '9.1/10 • Sung Jin-woo (Shadow Monarch)' },
  { title: 'One Punch Man', count: '9.0/10 • Saitama & Garou (Madhouse S1)' },
];

@Component({
  selector: 'app-terminal-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal-panel.component.html',
  styleUrl: './terminal-panel.component.css',
})
export class TerminalPanelComponent implements OnInit, OnDestroy {
  @ViewChild('terminalInput') inputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('terminalOutput') outputRef?: ElementRef<HTMLDivElement>;

  readonly logs = signal<TerminalLog[]>([]);
  readonly isAutoTyping = signal<boolean>(false);
  readonly currentTypedCommand = signal<string>('');
  commandText = '';

  private isDestroyed = false;
  private autoTypeTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.startAutoTyping();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.stopAutoTyping();
  }

  stopAutoTyping(): void {
    if (this.autoTypeTimer) {
      clearTimeout(this.autoTypeTimer);
      this.autoTypeTimer = undefined;
    }
    this.isAutoTyping.set(false);
    this.currentTypedCommand.set('');
  }

  startAutoTyping(): void {
    this.stopAutoTyping();
    this.logs.set([
      {
        id: 0,
        type: 'system',
        text: 'Session established (tty1) • Sanctuary Terminal online',
      },
    ]);
    this.isAutoTyping.set(true);

    const steps: { command: string; output: TerminalLog; pauseAfter: number }[] = [
      {
        command: 'whoami',
        output: {
          id: 1,
          type: 'output',
          text: 'Debapriya Das',
          outputColor: 'cyan',
        },
        pauseAfter: 750,
      },
      {
        command: 'personal-details',
        output: {
          id: 2,
          type: 'table',
          tableTitle: 'Personal Details',
          tableHeaderLeft: 'Title',
          tableHeaderRight: 'Detail',
          tableRows: PERSONAL_DETAILS_ROWS,
        },
        pauseAfter: 1300,
      },
      {
        command: 'projects',
        output: {
          id: 3,
          type: 'table',
          tableTitle: 'Featured Projects',
          tableHeaderLeft: 'Project',
          tableHeaderRight: 'Tech Stack & Summary',
          tableRows: PROJECT_ROWS,
        },
        pauseAfter: 1200,
      },
      {
        command: 'favourite-songs',
        output: {
          id: 4,
          type: 'table',
          tableTitle: 'Favourite Songs // Hip-Hop Vault',
          tableHeaderLeft: 'Artist / Album',
          tableHeaderRight: 'Essential Tracks',
          tableRows: FAVOURITE_SONGS_ROWS,
        },
        pauseAfter: 1200,
      },
      {
        command: 'favourite-anime',
        output: {
          id: 5,
          type: 'table',
          tableTitle: 'Favourite Anime // Hall of Fame',
          tableHeaderLeft: 'Anime Title',
          tableHeaderRight: 'Rating & Favorite Character',
          tableRows: FAVOURITE_ANIME_ROWS,
        },
        pauseAfter: 1300,
      },
      {
        command: 'exit',
        output: {
          id: 6,
          type: 'output',
          text: 'exit',
          outputColor: 'green',
        },
        pauseAfter: 500,
      },
    ];

    let currentStep = 0;

    const runNextStep = () => {
      if (this.isDestroyed || !this.isAutoTyping()) return;

      if (currentStep >= steps.length) {
        this.isAutoTyping.set(false);
        this.currentTypedCommand.set('');
        this.scrollToBottom();
        return;
      }

      const step = steps[currentStep];
      let charIndex = 0;
      this.currentTypedCommand.set('');

      const typeChar = () => {
        if (this.isDestroyed || !this.isAutoTyping()) return;

        if (charIndex < step.command.length) {
          this.currentTypedCommand.update((s) => s + step.command[charIndex]);
          charIndex++;
          this.scrollToBottom();
          // Natural deliberate typing speed (~42ms per char)
          this.autoTypeTimer = setTimeout(typeChar, 42);
        } else {
          // Pause before hitting Enter (~180ms)
          this.autoTypeTimer = setTimeout(() => {
            if (this.isDestroyed || !this.isAutoTyping()) return;

            const inputLog: TerminalLog = {
              id: Date.now(),
              type: 'input',
              text: step.command,
            };

            this.logs.update((l) => [...l, inputLog, step.output]);
            this.currentTypedCommand.set('');
            this.scrollToBottom();

            currentStep++;
            // Natural reading pause after display before typing next command
            this.autoTypeTimer = setTimeout(runNextStep, step.pauseAfter);
          }, 180);
        }
      };

      this.autoTypeTimer = setTimeout(typeChar, 80);
    };

    this.autoTypeTimer = setTimeout(runNextStep, 100);
  }

  runCommand(cmd?: string): void {
    const raw = (cmd !== undefined ? cmd : this.commandText).trim();
    if (!raw) return;

    // Interrupt auto-typing if user intervenes
    if (this.isAutoTyping() && raw.toLowerCase() !== 'replay') {
      this.stopAutoTyping();
    }

    this.commandText = '';
    const lower = raw.toLowerCase();

    if (lower === 'clear') {
      this.stopAutoTyping();
      this.logs.set([]);
      return;
    }

    if (lower === 'replay' || lower === 'demo') {
      this.startAutoTyping();
      return;
    }

    // Add input log
    const inputLog: TerminalLog = {
      id: Date.now(),
      type: 'input',
      text: raw,
    };

    let outputLog: TerminalLog;

    switch (lower) {
      case 'whoami':
        outputLog = {
          id: Date.now() + 1,
          type: 'output',
          text: 'Debapriya Das',
          outputColor: 'cyan',
        };
        break;

      case 'personal-details':
      case 'status':
      case 'profile':
      case 'git status':
        outputLog = {
          id: Date.now() + 1,
          type: 'table',
          tableTitle: 'Personal Details',
          tableHeaderLeft: 'Title',
          tableHeaderRight: 'Detail',
          tableRows: PERSONAL_DETAILS_ROWS,
        };
        break;

      case 'projects':
        outputLog = {
          id: Date.now() + 1,
          type: 'table',
          tableTitle: 'Featured Projects',
          tableHeaderLeft: 'Project',
          tableHeaderRight: 'Tech Stack & Summary',
          tableRows: PROJECT_ROWS,
        };
        break;

      case 'favourite-songs':
      case 'favorite-songs':
      case 'fav-songs':
      case 'songs':
      case 'music':
        outputLog = {
          id: Date.now() + 1,
          type: 'table',
          tableTitle: 'Favourite Songs // Hip-Hop Vault',
          tableHeaderLeft: 'Artist / Album',
          tableHeaderRight: 'Essential Tracks',
          tableRows: FAVOURITE_SONGS_ROWS,
        };
        break;

      case 'favourite-anime':
      case 'favorite-anime':
      case 'fav-anime':
      case 'anime':
      case 'watchlist':
        outputLog = {
          id: Date.now() + 1,
          type: 'table',
          tableTitle: 'Favourite Anime // Hall of Fame',
          tableHeaderLeft: 'Anime Title',
          tableHeaderRight: 'Rating & Favorite Character',
          tableRows: FAVOURITE_ANIME_ROWS,
        };
        break;

      case 'uptime':
        outputLog = {
          id: Date.now() + 1,
          type: 'output',
          text: '1352',
          outputColor: 'green',
        };
        break;

      case 'exit':
        outputLog = {
          id: Date.now() + 1,
          type: 'output',
          text: 'exit',
          outputColor: 'green',
        };
        break;

      case 'help':
        outputLog = {
          id: Date.now() + 1,
          type: 'output',
          text: `Available commands:\n  whoami            - Print active user identity\n  personal-details  - Inspect full developer dossier\n  projects          - Inspect featured production systems\n  favourite-songs   - Top tracks from Wayne, Eminem, Kendrick\n  favourite-anime   - Anime watchlist & favorite character reviews\n  about             - Developer lore, background & specializations\n  skills            - List core backend & fullstack stack\n  replay            - Re-run auto-typing terminal demo\n  clear             - Wipe current terminal screen buffer\n  exit              - Terminate active session`,
        };
        break;

      case 'about':
        outputLog = {
          id: Date.now() + 1,
          type: 'output',
          text: `DEBAPRIYA DAS // FULL STACK JAVA ENGINEER\nSpecialization: High-throughput microservices, clean architecture, and distributed systems.\nCore Stack: Java 21, Spring Boot, Spring Security, PostgreSQL, Angular 22.\nLocation: Arambagh, Hugli, West Bengal`,
        };
        break;

      case 'skills':
        outputLog = {
          id: Date.now() + 1,
          type: 'output',
          text: `SKILL MATRIX:\n[BACKEND]   Java 21, Spring Boot, Spring Security, Microservices, REST APIs\n[DATABASES] PostgreSQL, MySQL, MongoDB, Redis\n[FRONTEND]  Angular 22, TypeScript, Tailwind\n[DEVOPS]    Docker, AWS, Git, CI/CD Actions, Linux, Postman`,
        };
        break;

      default:
        outputLog = {
          id: Date.now() + 1,
          type: 'error',
          text: `Command not recognized: "${raw}". Type "help" or "personal-details".`,
        };
        break;
    }

    this.logs.update((current) => [...current, inputLog, outputLog]);
    this.scrollToBottom();
  }

  focusInput(): void {
    if (!this.isAutoTyping()) {
      this.inputRef?.nativeElement.focus();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.outputRef) {
        this.outputRef.nativeElement.scrollTop = this.outputRef.nativeElement.scrollHeight;
      }
    }, 20);
  }
}
