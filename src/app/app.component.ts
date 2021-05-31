import { Component, } from '@angular/core';
import { Router, RouterOutlet, } from '@angular/router';

import { MessagesService, } from './core';
import { SpinnerService } from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
  ],
})
export class AppComponent {
  public title: string = 'angular-sample';

  public constructor(
    public messagesService: MessagesService,
    public spinnerService: SpinnerService,
    private router: Router,
  ) {}

  public onActivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Activate Component', $event, routerOutlet);
  }

  public onDeactivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Deactivate Component', $event, routerOutlet);
  }

  public onDisplayMessages(): void {
    this.router.navigate([{
      outlets: {
        messages: [ 'messages',],
      },
    }]);
    this.messagesService.isDisplayed = true;
  }
}
