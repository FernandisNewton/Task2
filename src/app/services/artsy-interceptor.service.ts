import {
  HttpBackend,
  HttpClient,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ArtsyInterceptorService implements HttpInterceptor {
  private httpClient: HttpClient;
  constructor(
    private tokenStorageService: TokenStorageService,
    private handler: HttpBackend
  ) {
    this.httpClient = new HttpClient(handler);
  }

  refreshToken() {
    return this.httpClient
      .post(
        'https://api.artsy.net/api/tokens/xapp_token?client_id=2681d6a3b666d0463de1&client_secret=facdc4296f17aac86789ec2d1644052c',
        null
      )
      .pipe(
        tap((res) => {
          console.log('RES', res);
        }),
        map((response: any) => {
          return {
            token: response.token,
          };
        })
      );
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const clonedRequest = req.clone({
      headers: req.headers.set(
        'X-XAPP-Token',
        this.tokenStorageService.getToken()
      ),
    });

    return next.handle(clonedRequest).pipe(
      catchError((err) => {
        return this.refreshToken().pipe(
          tap((data: any) => {
            console.log(data);
          }),
          switchMap((data: any) => {
            if (data.token !== '') {
              this.tokenStorageService.saveToken(data.token);
            } else {
              return throwError(() => err);
            }
            const clonedRequestRepeat = req.clone({
              headers: req.headers.set(
                'X-XAPP-Token',
                this.tokenStorageService.getToken()
              ),
            });
            return next.handle(clonedRequestRepeat);
          })
        );
      })
    );
  }
}
