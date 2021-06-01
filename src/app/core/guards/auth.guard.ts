import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot,
         CanActivate,
         CanActivateChild,
         CanLoad,
         NavigationExtras,
         Route,
         Router,
         RouterStateSnapshot,
         UrlSegment,
         UrlTree, } from '@angular/router';

import { Observable, } from 'rxjs';

import { AuthService, } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  public constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> |
     Promise<boolean | UrlTree> |
     boolean | UrlTree {
    console.log('CanActivate Guard is called.');

    const { url } = state;

    return this.checkLogin(url);
  }

  public canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> |
     Promise<boolean | UrlTree> |
     boolean | UrlTree {
    console.log('CanActivateChild Guard is called');

    const { url } = state;

    return this.checkLogin(url);
  }

  public canLoad(
    route: Route,
    segments: UrlSegment[])
    : Observable<boolean | UrlTree> |
      Promise<boolean | UrlTree> |
      boolean | UrlTree {
    console.log('CanLoad Guard is called');

    const url = `/${route.path}`;

    return this.checkLogin(url) as boolean;
  }

  private checkLogin(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }

    this.authService.rediredUrl = url;

    const sessionId: number = 123456789;

    const navigationExtras: NavigationExtras = {
      queryParams: { sessionId, },
      fragment: 'anchor',
    };

    this.router.navigate([ '/login', ], navigationExtras)

    return false;
  }
}
