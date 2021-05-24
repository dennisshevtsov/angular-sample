import { NgModule,             } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { AdminComponent,          } from './admin.component';
import { AdminDashboardComponent,
         ManageTasksComponent,
         ManageUsersComponent,    } from './components';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'users',
            component: ManageUsersComponent,
          },
          {
            path: 'tasks',
            component: ManageTasksComponent,
          },
          {
            path: '',
            component: AdminDashboardComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AdminRoutingModule {
  public static components: any[] = [
    AdminComponent,
    AdminDashboardComponent,
    ManageTasksComponent,
    ManageUsersComponent,
  ];
}
