import { NgModule, } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { Router, } from '@angular/router';

import { AppRoutingModule, } from './app-routing.module';
import { AppComponent, } from './app.component';
import { LayoutModule, } from './layout/layout.module';
import { TasksModule, } from './tasks/tasks.module';
import { UsersModule, } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    TasksModule,
    UsersModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
