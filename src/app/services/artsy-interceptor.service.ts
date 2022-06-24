import { NgIfContext } from '@angular/common';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ArtsyInterceptorService implements HttpInterceptor {
  constructor(private http: HttpClient) {}

   

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('hello');
    // this.token = this.http
    //   .post('https://api.artsy.net/api/tokens/xapp_token', {
    //     client_id: '2681d6a3b666d0463de1',
    //     client_secret: 'facdc4296f17aac86789ec2d1644052c',
    //   })
    //   .pipe(
    //     tap((data: any) => {
    //       console.log(data);
    //     })
    //   );
    const newReq = req.clone({
      setHeaders: {
        'X-XAPP-Token':
          'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI2MmI0MTBiMmQxMmZlMzAwMGVjYTA4ZTMiLCJleHAiOjE2NTY1NzMwOTMsImlhdCI6MTY1NTk2ODI5MywiYXVkIjoiNjJiNDEwYjJkMTJmZTMwMDBlY2EwOGUzIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjYyYjQxMjI1ZjdmYzI2MDAwY2ZiNWY4NiJ9.0A8RkCCrmUENGfEXfPWWJutfAxU6OWJfiKHe-ljrRoo',
      },
    });
    return next.handle(newReq);
  }
}
