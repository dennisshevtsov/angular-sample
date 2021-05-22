import { NgModule,     } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule,  } from '@angular/forms';

import { UserComponent,      } from './components';
import { UsersRoutingModule, } from './users-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UsersRoutingModule.components,
    UserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ]
})
export class UsersModule {
}
