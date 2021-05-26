import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public message: string;

  private unsubscribe: Subject<void> = new Subject<void>();

 public constructor(
   public authService: AuthService,
   private router: Router,
 ) { }

  public ngOnInit(): void {
    this.setMessage();
  }

  public ngOnDestroy(): void {
    console.log('[takeUntil ngOnDestroy]');

    this.unsubscribe.complete();
  }

  public onLogin(): void {
    this.message = 'Trying to log in ...';

    const observer = {
      next: () => {
        this.setMessage();

        if (this.authService.isLoggedIn) {
          const redirect: string = this.authService.rediredUrl
            ? this.authService.rediredUrl
            : '/admin';
          this.router.navigate([redirect]);
        }
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('[takeUntil] complete'),
    };

    this.authService.login()
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe(observer);
  }

  public onLogout(): void {
    this.authService.logout();
    this.setMessage();
  }

  private setMessage(): void {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
}
