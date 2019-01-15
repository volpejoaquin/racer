// angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'timing'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
