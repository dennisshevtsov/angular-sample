import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest, } from "@angular/common/http";

import { Observable, } from "rxjs";

export class TsInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let clonedRequest;

    if (req.url.includes('users')) {
      clonedRequest = req.clone({
        params: new HttpParams().set('ts_interceptor', Date.now().toString()),
      });

      console.log(clonedRequest);
    } else {
      clonedRequest = req;
    }

    return next.handle(clonedRequest);
  }
}
