import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Adventure } from '../../models/adventure';
import { Question } from '../../models/question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataloaderService {

  private adventures: Adventure[];
  constructor(private http: HttpClient) { }

  // function to fetch list of adventures from server
  public getAdventures(): Observable<Adventure[]> {
    const url = environment.apiConfig.url + environment.apiConfig.extn;
    console.log(url);
    return this.http.get<any>(url)
      .pipe(
        map(_ => _.adventures),
        tap(adventures => { this.adventures = adventures; this.log('fetched adventures'); }),
        catchError(this.handleError<Adventure[]>('getAdventures', []))
      );
  }

  // function to return a perticular adventure from collection
  public getAdventure(name: string): Adventure {
    if (!name) {
      throw new Error('Invalid param: name');
    }

    if (!this.adventures) {
      throw new Error('Adventures data not initialized');
    }
    const filteredAdventures = this.adventures.filter(_ => _.name === name);
    return filteredAdventures.length === 1 ? filteredAdventures[0] : null;
  }

  // TODO: Keep a cache of downloladed questions
  public loadAdventure(adventureName: string): Observable<Question[]> {
    return this.http.get<any>(`${environment.apiConfig.url}/${adventureName}${environment.apiConfig.extn}`)
      .pipe(
        map(_ => _.questions),
        tap(_ => this.log(`fetched game:${adventureName}`)),
        catchError(this.handleError<Adventure[]>('getAdventures', []))
      );
  }

  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string): void {
    console.log(`DataloaderService: ${message}`);
  }
}
