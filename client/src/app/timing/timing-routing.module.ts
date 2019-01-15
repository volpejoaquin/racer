// angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import {
  TimingHomeComponent,
  TimingAnalysisComponent,
  TimingLeaderboardComponent,
  TimingBestPartialsLapsComponent,
  TimingBestPerPartialsComponent,
  TimingPartialsPerLapComponent
} from './containers';

const routes: Routes = [
  {
    path: 'timing',
    component: TimingHomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'leaderboard'
      },
      {
        path: 'leaderboard',
        component: TimingLeaderboardComponent,
        data: {
          title: 'Tiempos'
        }
      },
      {
        path: 'partials',
        component: TimingBestPartialsLapsComponent,
        data: {
          title: 'Parciales'
        }
      },
      {
        path: 'best-per-partials',
        component: TimingBestPerPartialsComponent,
        data: {
          title: 'Mejor por parcial'
        }
      },
      {
        path: 'laps',
        component: TimingPartialsPerLapComponent,
        data: {
          title: 'Vueltas'
        }
      },
      {
        path: 'analysis',
        component: TimingAnalysisComponent,
        data: {
          title: 'Análisis'
        }
      }   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TimingRoutingModule { }
