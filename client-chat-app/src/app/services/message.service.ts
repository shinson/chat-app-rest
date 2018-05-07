import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Message } from '../models/message';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = environment.api_url+'/messages';
  

  constructor( private http: HttpClient) { 

  }

  getMessages():   Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl)
    .pipe(catchError(this.handleError<Message[]>([])));
  }

  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message, httpOptions)
    .pipe(catchError(this.handleError<Message>()));
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}


