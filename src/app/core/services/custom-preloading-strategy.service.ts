import { Injectable, } from '@angular/core';
import { PreloadingStrategy, Route, } from '@angular/router';

import { Observable, of, } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomPreloadingStrategyService implements PreloadingStrategy {
  public preloadedModules: string[] = [];

  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data?.preload && route.path) {
      this.preloadedModules.push(route.path);

      return load();
    }
    else {
      return of(null);
    }
  }
}
