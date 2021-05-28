import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot,
         Resolve,
         Router, } from '@angular/router';

import { Observable, of, } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { UserArrayService, } from '../services';
import { UserModel, } from './../models/user.model';

@Injectable({
  providedIn: 'any',
})
export class UserResolveGuard implements Resolve<UserModel> {
  public constructor(
    private userArrayService: UserArrayService,
    private router: Router,
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<UserModel | null> {
    console.log('UserResolve Guard is called');

    if (!route.paramMap.has('userID')) {
      return of(new UserModel(0, '', ''));
    }

    const id = +route.paramMap.get('userID')!;

    return this.userArrayService.getUser(id)
                                .pipe(map((user: UserModel) => {
                                  if (user) {
                                    return user;
                                  }
                                  else {
                                    this.router.navigate(['/users']);

                                    return null;
                                  }
                                }),
                                take(1),
                                catchError(() => {
                                  this.router.navigate(['/users']);

                                  return of(null);
                                }));
  }
}
