import { Component, } from '@angular/core';
import { RouterOutlet, } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
  ]
})
export class AppComponent {
  public title: string = 'angular-sample';

  public onActivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Activate Component', $event, routerOutlet);
  }

  public onDeactivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Deactivate Component', $event, routerOutlet);
  }
}
