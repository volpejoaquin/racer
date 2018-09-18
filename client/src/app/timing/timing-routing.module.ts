// angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { TimingHomeComponent } from './components/timing-home/timing-home.component';

const routes: Routes = [
  {
    path: 'timing',
    pathMatch: 'full',
    component: TimingHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TimingRoutingModule { }
