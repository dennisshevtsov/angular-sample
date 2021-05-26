import { Injectable, } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable, } from 'rxjs';

import { AuthService, } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean | UrlTree {
    console.log('CanActivate Guard is called.');

    const { url } = state;

    return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }

    this.authService.rediredUrl = url;

    return this.router.parseUrl('/login');
  }
}
