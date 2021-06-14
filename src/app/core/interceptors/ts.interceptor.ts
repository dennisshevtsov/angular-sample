import { HttpEvent, HttpEventType, HttpHandler,
         HttpInterceptor,
         HttpParams,
         HttpRequest,
         HttpResponse, } from "@angular/common/http";

import { Observable, } from "rxjs";
import { filter, map, } from "rxjs/operators";

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

    return next.handle(clonedRequest)
               .pipe(filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
                     map((event: HttpEvent<any>) => {
                       const response = event as HttpResponse<any>;

                       if (response.url?.includes('users')) {
                         console.log('Response interceptor:');
                         console.log(response);
                         console.log(response.body);
                       }

                       return response;
                     }));
  }
}
