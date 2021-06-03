import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Title, } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router, RouterOutlet, } from '@angular/router';

import { PartialObserver, Subscription, } from 'rxjs';
import { filter, map, switchMap, } from 'rxjs/operators';
import { SpinnerService, } from './widgets';

import { CustomPreloadingStrategyService, MessagesService, } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: { [key: string]: Subscription } = {};

  public title: string = 'angular-sample';

  public constructor(
    public messagesService: MessagesService,
    public spinnerService: SpinnerService,
    private preloadingStrategy: CustomPreloadingStrategyService,
    private titleService: Title,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    console.log(
      'Preloading Modules: ',
      this.preloadingStrategy.preloadedModules,
    );

    this.setPageTitles();
    this.setMessageServiceOnRefresh();
  }

  public ngOnDestroy(): void {
    this.sub.navigationStart.unsubscribe();
    this.sub.navigationEnd.unsubscribe();
  }

  public onActivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Activate Component', $event, routerOutlet);

    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
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

  private setPageTitles(): void {
    this.sub.navigationEnd = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.routerState.root),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      }),
      filter(route => route.outlet === 'primary'),
      switchMap(route => route.data)
    ).subscribe(data => this.titleService.setTitle(data.title));
  }

  private setMessageServiceOnRefresh(): void {
    const observer: PartialObserver<NavigationStart> | undefined = {
      next: (event: NavigationStart) => {
        (event: NavigationStart) => this.messagesService.isDisplayed = event.url.includes('message');
      },
    };

    this.sub.navigationStart = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .pipe(map(event => event as NavigationStart))
      .subscribe(observer);
  }
}
