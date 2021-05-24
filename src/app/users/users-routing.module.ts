import { NgModule,             } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { UserComponent, UserFormComponent, UserListComponent } from './components';

import { UsersComponent, } from './users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'add',
        component: UserFormComponent,
      },
      {
        path: 'edit/:userID',
        component: UserFormComponent 
      },
      {
        path: '',
        component: UserListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class UsersRoutingModule {
  public static components = [
    UserComponent,
    UsersComponent,
    UserListComponent,
    UserFormComponent,
  ]
}
