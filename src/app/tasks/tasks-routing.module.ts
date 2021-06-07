import { NgModule, } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { RouterModule, Routes, } from '@angular/router';

import { TaskListComponent,
         TaskFormComponent, } from './components';


const metaTags: MetaDefinition[] = [
  {
    name: 'description',
    content: 'Task Manager Application. This is SPA.',
  },
  {
    name: 'keywords',
    content: 'Angular tutorial, APA, Routing',
  },
];

const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
    data: {
      title: 'Task Manager',
      meta: metaTags,
    },
  },
  {
    path: 'add',
    component: TaskFormComponent,
  },
  {
    path: 'edit/:taskID',
    component: TaskFormComponent,
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
