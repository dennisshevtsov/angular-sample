import { NgModule, } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { AboutComponent,
         PathNotFoundComponent,
         MessagesComponent,
         LoginComponent, } from './layout';

const routes: Routes = [
  {
    path: 'messages',
    component: MessagesComponent,
    outlet: 'messages',
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(model => model.UsersModule),
  },
  {
    path: '**',
    component: PathNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
