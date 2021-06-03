import { NgModule, } from '@angular/core';
import { ExtraOptions, RouterModule, Routes, } from '@angular/router';

import { AuthGuard, CustomPreloadingStrategyService, } from './core';
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
    data: {
      title: 'About',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule),
    data: {
      title: 'Admin',
    },
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(model => model.UsersModule),
    data: {
      preload: true,
      title: 'Users',
    },
  },
  {
    path: '**',
    component: PathNotFoundComponent,
    data: {
      title: 'Page Not Found',
    },
  },
];

const extraOptions: ExtraOptions = {
  preloadingStrategy: CustomPreloadingStrategyService,
  enableTracing: true,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, extraOptions),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
