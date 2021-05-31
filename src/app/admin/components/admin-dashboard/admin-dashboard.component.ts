import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';

import { Observable, } from 'rxjs';
import { map, } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  public sessionId: Observable<string>;
  public token: Observable<string>;

  public constructor(
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.sessionId = this.route.queryParamMap.pipe(
      map(params => params.get('sessionID') || 'None'));

    this.token = this.route.fragment.pipe(
      map(fragment => fragment || 'None'));
  }
}
