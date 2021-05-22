import { Component,
         ChangeDetectionStrategy,
         Input,                   } from '@angular/core';

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

  public onEditUser(): void {
    
  }
}
