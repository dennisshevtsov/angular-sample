import { Component,
         ChangeDetectionStrategy,
         Input,
         Output,
         EventEmitter,            } from '@angular/core';

import { UserModel, } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input()
  public user: UserModel;

  @Output()
  public editUser: EventEmitter<UserModel> = new EventEmitter<UserModel>();

  public onEditUser(): void {
    this.editUser.emit(this.user);
  }
}
