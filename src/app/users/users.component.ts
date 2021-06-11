import { Component, } from '@angular/core';
import { Router, } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public constructor(
    private router: Router,
  ) { }

  public onCreateUser(): void {
    const link = [ '/users/add' ];

    this.router.navigate(link);
  }
}
