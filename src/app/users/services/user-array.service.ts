import { Injectable, } from '@angular/core';

import { Observable, of, throwError, } from 'rxjs';
import { catchError, map, } from 'rxjs/operators';

import { UserModel, } from '../models/user.model';

const userList: UserModel[] = [
  new UserModel(1, 'Anna', 'Borisova'),
  new UserModel(2, 'Boris', 'Vlasov'),
  new UserModel(3, 'Gennadiy', 'Dmitriev'),
];

const userListOvservable: Observable<UserModel[]> = of(userList);

@Injectable({
  providedIn: 'any',
})
export class UserArrayService {
  public users$: Observable<UserModel[]> = userListOvservable;
  
  public getUser(id: number | string): Observable<UserModel> {
    return this.users$.pipe(
      map((users: UserModel[]) => users.find(user => user.id === +id)!),
      catchError(error => throwError('Error in getUser method')));
  }

  public createUser(user: UserModel): void {
    userList.push(user);
  }

  public updateUser(user: UserModel): void {
    const index = userList.findIndex(model => model.id == user.id);

    if (index > -1) {
      userList.splice(index, 1, user);
    }
  }
}
