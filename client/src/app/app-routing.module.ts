import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimingComponent } from './timing/timing.component';

const routes: Routes = [
  {
    path: '', component: TimingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
