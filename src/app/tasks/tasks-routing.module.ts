import { NgModule, } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { TaskListComponent, } from './components';

const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TasksRoutingModule {
}