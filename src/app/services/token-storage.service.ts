import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private httpClient: HttpClient;

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  public saveToken(token: string): void {
    localStorage.removeItem('X-XAPP-Token');
    localStorage.setItem('X-XAPP-Token', JSON.stringify(token));
  }

  public getToken(): any {
    let tokenData: any = localStorage.getItem('X-XAPP-Token');
    return JSON.parse(tokenData);
  }
}
