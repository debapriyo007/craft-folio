import { Component } from '@angular/core';
import { PortfolioComponent } from '@features/portfolio/portfolio.component';
import { CustomCursorComponent } from '@shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PortfolioComponent, CustomCursorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
