import { NgModule,     } from '@angular/core';
import { CommonModule, } from '@angular/common';

import { UserComponent, } from './components';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersRoutingModule.components,
    UserComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class UsersModule {
}
