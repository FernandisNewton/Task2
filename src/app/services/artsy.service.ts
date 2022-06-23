import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtsyService {
  constructor(private http: HttpClient) {}

  artists?: any[];
  getArtists() {
    console.log('Inside');
    this.http
      .get('https://api.artsy.net/api/search?q=picasso&size=10')
      .pipe(
        map((data: any) => {
          return data._embedded.results;
        }),
        tap((data: any) => {
          console.log(data);
          this.artists = data || [];
        })
      )
      .subscribe();
    return this.artists;
  }
}
