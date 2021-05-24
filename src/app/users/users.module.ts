import { NgModule,     } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule,  } from '@angular/forms';
import { RouterModule, } from '@angular/router';

import { UsersRoutingModule, } from './users-routing.module';

@NgModule({
  declarations: [
    UsersRoutingModule.components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UsersRoutingModule,
  ]
})
export class UsersModule {
}
