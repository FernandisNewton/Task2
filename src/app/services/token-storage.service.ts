import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  public saveToken(token: string): void {
    localStorage.removeItem('X-XAPP-Token');
    localStorage.setItem('X-XAPP-Token', token);
  }

  public getToken(): any {
    let tokenData: any = localStorage.getItem('X-XAPP-Token');
    return tokenData;
  }
}
