import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { FileData } from '../model/file-data';
import { MessageService } from './message.service';

const fileDataUrl = '//localhost:8080/api/fileDatas';
const uploadUrl = fileDataUrl + '/upload';

@Injectable({
  providedIn: 'root',
})
export class FileDataService {

  constructor(
      private http: HttpClient,
      private messageService: MessageService
   ) { }

  getFileDatas(): Observable<any> {
    return this.http.get<FileData[]>(fileDataUrl)
      .pipe(
        catchError(this.handleError('getFileData', []))
      );
  }

  upload(file: File, title: string, description: string): any {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    return this.http.post<any>(uploadUrl, formData)
      .subscribe(
        result => {
          let message = 'File with id ' + result.id + ' was uploaded';
          this.messageService.displayMessage('success', message);
        }, error => {
          this.messageService.displayMessage('error', error.error.message);
        }, () => {
          // On complete
        });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.messageService.displayMessage('error', error.message);

      // Let the app keep running by returning an empty result.
       return of(result as T);
     };
   }

}
