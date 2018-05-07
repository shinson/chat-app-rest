import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.api_url+'/users';
  

  constructor( private http: HttpClient) { 

  }

  getUsers():   Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
    .pipe(catchError(this.handleError<User[]>([])));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, httpOptions)
    .pipe(catchError(this.handleError<User>()));
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
