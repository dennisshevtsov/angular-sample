import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { Inject, Injectable, } from '@angular/core';

import { Observable, of, throwError, } from 'rxjs';
import { catchError, publish, refCount, retry, } from 'rxjs/operators';

import { UserModel, } from '../models/user.model';
import { UsersAPI, } from '../users.config';

@Injectable({
  providedIn: 'any',
})
export class UserObservableService {
  public constructor(
    private http: HttpClient,

    @Inject(UsersAPI)
    private usersUrl: string,
  ) { }

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersUrl)
                    .pipe(retry(3),
                          publish(),
                          refCount(),
                          catchError(this.handleError));
  }

  public getUser(id: number): Observable<UserModel>
  {
    return of(new UserModel(0, '', ''));
  }

  public createUser(user: UserModel): Observable<UserModel>
  {
    return of(user);
  }

  public deleteUser(user: UserModel): Observable<UserModel>
  {
    return of(user);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof Error) {
      console.error('An error occured:', error.error.message);
    }
    else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.')
  }
}
