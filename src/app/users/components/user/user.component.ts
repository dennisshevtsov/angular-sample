import { Component,
         ChangeDetectionStrategy,
         Input,
         Output,
         EventEmitter, } from '@angular/core';

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
  public editUser = new EventEmitter<UserModel>();

  @Output()
  public deleteUser = new EventEmitter<UserModel>();

  public onEditUser(): void {
    this.editUser.emit(this.user);
  }

  public onDeleteUser(): void {
    this.deleteUser.emit(this.user);
  }
}
