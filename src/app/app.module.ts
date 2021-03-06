import { NgModule,         } from '@angular/core';
import { BrowserModule,    } from '@angular/platform-browser';
import { Router,           } from '@angular/router';
import { HttpClientModule, } from '@angular/common/http';

import { AppRoutingModule,         } from './app-routing.module';
import { AppComponent,             } from './app.component';
import { LayoutModule,             } from './layout/layout.module';
import { TasksModule,              } from './tasks/tasks.module';
import { SpinnerModule,            } from './widgets/spinner/spinner.module';
import { httpInterceptorProviders, } from './core/interceptors';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    TasksModule,
    SpinnerModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
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
