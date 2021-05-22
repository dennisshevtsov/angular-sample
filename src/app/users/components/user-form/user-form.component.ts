import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, } from '@angular/router';

import { PartialObserver, Subscription, } from 'rxjs';

import { UserModel, } from '../../models/user.model';
import { UserArrayService, } from '../../services/user-array.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  public user: UserModel;
  public originalUser: UserModel;

  private subscription: Subscription;

  public constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.user = new UserModel(0, '', '');

    const id: number = +this.route.snapshot.paramMap.get('userID')!;
    const observer: PartialObserver<UserModel> = {
      next: (user: UserModel) => {
        this.user = { ...user };
        this.originalUser = { ...user };
      },
      error: (error: any) => console.log(error),
    };
    this.subscription = this.userArrayService.getUser(id)
      .subscribe(observer);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSaveUser(): void {
    const user: UserModel = { ...this.user };

    if (user.id) {
      this.userArrayService.updateUser(user);
    }
    else {
      this.userArrayService.createUser(user);
    }

    this.originalUser = { ...this.user };
    this.onGoBack();
  }

  public onGoBack(): void {
    const link: any[] = ['./../../'];
    const extras: NavigationExtras = {
      relativeTo: this.route,
    };

    this.router.navigate(link, extras);
  }
}
