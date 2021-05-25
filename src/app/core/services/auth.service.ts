import { Injectable, } from '@angular/core';

import { Observable, of, } from 'rxjs';
import { delay, tap,     } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: boolean = false;
  public rediredUrl: string;

  public login(): Observable<boolean> {
    return of(true).pipe(delay(1000),
                         tap(value => this.isLoggedIn = value));
  }

  public logout(): void {
    this.isLoggedIn = false;
  }
}
