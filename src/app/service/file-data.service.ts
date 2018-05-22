import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { FileData } from '../model/file-data';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class FileDataService {

  private fileDataUrl = 'api/files';  // URL to web api
  private uploadUrl = this.fileDataUrl + '/upload';

  constructor(
      private http: HttpClient,
      private messageService: MessageService
   ) { }

  getFileDatas(): Observable<FileData[]> {
    return this.http.get<FileData[]>(this.fileDataUrl)
      .pipe(
          catchError(this.handleError('getHeroes', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.messageService.displayMessage('error', error);

      // Let the app keep running by returning an empty result.
       return of(result as T);
     };
   }

}
