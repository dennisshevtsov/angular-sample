import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, } from '@angular/router';

import { Observable, of, PartialObserver, } from 'rxjs';
import { switchMap, } from 'rxjs/operators';

import { UserModel, } from '../../models/user.model';
import { UserArrayService, UserObservableService, } from '../../services';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: [
    './user-list.component.scss',
  ],
})
export class UserListComponent implements OnInit {
  public users$: Observable<UserModel[]>;

  private editedUser: UserModel;

  public constructor(
    private userObservableService: UserObservableService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.users$ = this.userObservableService.getUsers();

    const observer = {
      next: (user: UserModel | null) => {
        if (user) {
          this.editedUser = { ...user };
        }

        console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
      },
      error: (error: any) => console.log(error),
    };
    this.route.paramMap.pipe(switchMap((params: ParamMap) => {
                         if (params.get('editedUserId')) {
                           return this.userObservableService.getUser(+params.get('editedUserId')!);
                         }

                         return of(null);
                        }))
                       .subscribe(observer);
  }

  public isEdited(user: UserModel): boolean {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }

    return false;
  }

  public onEditUser(user: UserModel): void {
    const link: any[] = [
      '/users/edit',
      user.id,
    ]

    this.router.navigate(link);
  }

  public onDeleteUser(user: UserModel): void {
    this.users$ = this.userObservableService.deleteUser(user);
  }
}
