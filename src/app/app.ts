import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursorComponent } from '@shared/components';
import { SoundService } from '@core/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomCursorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly soundService = inject(SoundService);
}
