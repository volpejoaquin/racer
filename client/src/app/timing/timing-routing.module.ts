// angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { TimingHomeComponent } from './containers/timing-home/timing-home.component';
import { TimingAnalysisComponent } from './containers/timing-analysis/timing-analysis.component';

const routes: Routes = [
  {
    path: 'timing',
    pathMatch: 'full',
    component: TimingHomeComponent
  },
  {
    path: 'timing-analysis',
    pathMatch: 'full',
    component: TimingAnalysisComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TimingRoutingModule { }
