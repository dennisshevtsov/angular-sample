import { Component, OnInit,      } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';

import { EMPTY, Observable, } from 'rxjs';
import { catchError,        } from 'rxjs/operators';

import { UserModel,        } from '../../models/user.model';
import { UserArrayService, } from '../../services/user-array.service';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users$: Observable<UserModel[]>
  
  public constructor(
    private userArrayService: UserArrayService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.users$ = this.userArrayService.users$.pipe(
      catchError(error => {
        console.log(error);

        return EMPTY;
      })
    );
  }

  public onEditUser(user: UserModel): void {
    const link: any[] = [
      '/users/edit',
      user.id,
    ]

    this.router.navigate(link);
  }
}
