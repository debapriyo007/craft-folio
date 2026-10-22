import { Component, output } from '@angular/core';
import { ROOM_MODULES } from '@core/data/zone-data';
import { RoomModule } from '@core/models';

@Component({
  selector: 'app-room-scene',
  standalone: true,
  templateUrl: './room-scene.component.html',
  styleUrl: './room-scene.component.css',
})
export class RoomSceneComponent {
  readonly modules: RoomModule[] = ROOM_MODULES;
  readonly moduleSelect = output<string>();

  selectModule(moduleId: string, targetId: string): void {
    this.moduleSelect.emit(moduleId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Add subtle focus ring / highlight effect momentarily
      element.classList.add('section-highlight');
      setTimeout(() => {
        element.classList.remove('section-highlight');
      }, 1400);
    }
  }

  onKeyDown(event: KeyboardEvent, moduleId: string, targetId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectModule(moduleId, targetId);
    }
  }
}
