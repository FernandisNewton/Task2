import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtsyService {
  constructor(private http: HttpClient) {}

  getArtists(artistName: any): Observable<any[]> {
    console.log('Inside getArtsy');
    let result$ = this.http
      .get(`https://api.artsy.net/api/search?q=${artistName}&size=10`)
      .pipe(
        map((response: any) => {
          return response._embedded.results;
        }),
        tap((data: any) => {
          console.log(data);
        })
      );
    return result$;
  }

  getArtistInfo(artist: any) {
    let id = artist._links.self.href.split('/').slice(-1)[0];

    const joinedObservable$ = forkJoin({
      artistInfo: this.http.get(`https://api.artsy.net/api/artists/${id}`).pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err, caught) => of(err)),
        tap((data: any) => {
          console.log(data);
        })
      ),
      artworks: this.http
        .get(`https://api.artsy.net/api/artworks?artist_id=${id}`)
        .pipe(
          map((response: any) => {
            return response;
          }),
          catchError((err, caught) => of('Error')),
          tap((data: any) => {
            console.log(data);
          })
        ),
    });

    return joinedObservable$;
  }

  getGenes(art: any) {
    let genes$ = this.http.get(art._links.genes.href).pipe(
      map((response: any) => {
        return response._embedded.genes;
      }),
      tap((data: any) => {
        console.log(data);
      })
    );

    return genes$;
  }
}
