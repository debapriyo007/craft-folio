import { Routes } from '@angular/router';
import { PortfolioComponent } from '@features/portfolio/portfolio.component';
import { DebusZoneComponent } from '@features/zone/debus-zone.component';

export const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent,
    title: 'Debapriya Das | Portfolio & Developer Sanctuary',
  },
  {
    path: 'zone',
    component: DebusZoneComponent,
    title: "Debu's Zone | Beyond the Code",
  },
  {
    path: '**',
    redirectTo: '',
  },
];
