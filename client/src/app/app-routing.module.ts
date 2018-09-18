// angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { TimingHomeComponent } from './timing/components';
import { DataAcquisitionComponent } from './data-acquisition/components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'timing'
  },
  {
    path: 'data',
    component: DataAcquisitionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
