import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, UrlTree, } from '@angular/router';

import { Observable, PartialObserver, Subscription, } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CanComponentDeactivate, DialogService } from 'src/app/core';

import { UserModel, } from '../../models/user.model';
import { UserArrayService, } from '../../services/user-array.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  public user: UserModel;
  public originalUser: UserModel;

  private subscription: Subscription;

  public constructor(
    private userArrayService: UserArrayService,
    private dialogService: DialogService,
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

    if (user.id) {
      this.userArrayService.updateUser(user);
      this.router.navigate([
        '/users',
        {
          editUserID: user.id,
        },
      ]);
    }
    else {
      this.userArrayService.createUser(user);
      this.onGoBack();
    }

    this.originalUser = { ...this.user };
  }

  public onGoBack(): void {
    const link: any[] = ['./../../'];
    const extras: NavigationExtras = {
      relativeTo: this.route,
    };

    this.router.navigate(link, extras);
  }
}
