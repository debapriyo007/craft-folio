import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioTab } from '@core/models';
import { FooterComponent } from '@shared/components';
import { TabNavComponent } from '@features/portfolio/components/tab-nav/tab-nav.component';
import {
  ZoneHeaderComponent,
  RoomSceneComponent,
  DeveloperLabComponent,
  HipHopStationComponent,
  AnimeWatchlistComponent,
} from './components';

@Component({
  selector: 'app-debus-zone',
  standalone: true,
  imports: [
    ZoneHeaderComponent,
    TabNavComponent,
    RoomSceneComponent,
    DeveloperLabComponent,
    HipHopStationComponent,
    AnimeWatchlistComponent,
    FooterComponent,
  ],
  templateUrl: './debus-zone.component.html',
  styleUrl: './debus-zone.component.css',
})
export class DebusZoneComponent {
  private readonly router = inject(Router);

  handleTabChange(tab: PortfolioTab): void {
    if (tab === 'zone') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    this.router.navigate(['/'], { queryParams: { tab } });
  }
}
