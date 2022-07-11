import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ArtsyInterceptorService implements HttpInterceptor {
  constructor(private http: HttpClient) {}

   

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let token:any = "";
    // token = this.http
    //   .post('https://api.artsy.net/api/tokens/xapp_token', {
    //     client_id: '2681d6a3b666d0463de1',
    //     client_secret: 'facdc4296f17aac86789ec2d1644052c',
    //   })
    //   .pipe(
    //     tap((data: any) => {
           
    //       console.log(data);
    //     })
    //   ).subscribe();
    const newReq = req.clone({
      setHeaders: {
        'X-XAPP-Token':
          'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI2MmI0MTBiMmQxMmZlMzAwMGVjYTA4ZTMiLCJleHAiOjE2NTgxMTk3NjgsImlhdCI6MTY1NzUxNDk2OCwiYXVkIjoiNjJiNDEwYjJkMTJmZTMwMDBlY2EwOGUzIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjYyY2JhYmQ4ZmQ0YmQ0MDAwY2JhZjZjOCJ9.5cHpT4xr_0kiLf1PTrdFBaW7L9FpIiCMfd7TFNJqy_4',
      },
    });
    return next.handle(newReq);
  }
}
