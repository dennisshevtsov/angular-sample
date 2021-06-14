import { Location, } from '@angular/common';
import { Component, OnInit, OnDestroy, } from '@angular/core';
import { ActivatedRoute, Router, UrlTree, } from '@angular/router';

import { Observable, Subscription, } from 'rxjs';
import { pluck, } from 'rxjs/operators';

import { AutoUnsubscribeDecorator,
         CanComponentDeactivate,
         DialogService, } from '../../../core';
import { UserModel, } from '../../models/user.model';
import { UserObservableService, } from '../../services';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
@AutoUnsubscribeDecorator()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  public user: UserModel;
  public originalUser: UserModel;

  private sub: Subscription;

  public constructor(
    private userObservableService: UserObservableService,
    private dialogService: DialogService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.route.data.pipe(pluck('user'))
                   .subscribe((user: UserModel) => {
                     this.user = { ...user };
                     this.originalUser = { ...user };
                   });
  }

  public canDeactivate()
    : Observable<boolean | UrlTree> |
      Promise<boolean | UrlTree> |
      boolean | UrlTree {
    const flags = Object.keys(this.originalUser)
                        .map(key => {
                          const property = key as keyof UserModel;

                          this.originalUser[property] === this.user[property];
                        });

    if (flags.every(flag => flag)) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
  }

  public onSaveUser(): void {
    const user: UserModel = { ...this.user };

    const method = user.id ? 'updateUser' : 'createUser';
    const observer = {
      next: (savedUser: UserModel) => {
        this.originalUser = { ...savedUser };
        user.id ? this.router.navigate([ 'users', { editedUserID: user.id } ])
                : this.onGoBack();
      },
      error: (error: any) => console.log(error),
    };

    this.sub = this.userObservableService[method](user).subscribe(observer);
  }

  public onGoBack(): void {
    this.location.back();
  }
}
