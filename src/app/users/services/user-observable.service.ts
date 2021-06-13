import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Inject, Injectable, } from '@angular/core';

import { Observable, of, throwError, } from 'rxjs';
import { catchError, concatMap, retry, share, } from 'rxjs/operators';

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
                          share(),
                          catchError(this.handleError));
  }

  public getUser(id: number): Observable<UserModel>
  {
    const url = `${this.usersUrl}/${id}`;

    return this.http.get<UserModel>(url)
                    .pipe(retry(3),
                          share(),
                          catchError(this.handleError));
  }

  public updateUser(user: UserModel): Observable<UserModel> {
    const url = `${this.usersUrl}/${user.id}`;
    const body = JSON.stringify(user);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put<UserModel>(url, body, options)
                    .pipe(catchError(this.handleError));
  }

  public createUser(user: UserModel): Observable<UserModel>
  {
    const url = this.usersUrl;
    const body = JSON.stringify(user);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<UserModel>(url, body, options)
                    .pipe(catchError(this.handleError));
  }

  public deleteUser(user: UserModel): Observable<UserModel[]>
  {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete(url)
                    .pipe(concatMap(() => this.getUsers()),
                          catchError(this.handleError));
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
