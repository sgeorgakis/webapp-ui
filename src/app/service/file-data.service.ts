import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { FileData } from '../model/file-data';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class FileDataService {

  private fileDataUrl = '//localhost:8080/api/fileDatas';  // URL to web api
  private uploadUrl = '//localhost:8080/api/fileDatas/upload';

  constructor(
      private http: HttpClient,
      private messageService: MessageService
   ) { }

  getFileDatas(): Observable<any> {
    return this.http.get<FileData[]>(this.fileDataUrl)
      .pipe(
          catchError(this.handleError('getFileDatas', []))
      );
  }

  upload(file: File, title: string, description: string): any {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post<any>(this.uploadUrl, formData, {headers: headers})
      .subscribe(data => {
        console.log(data);
      });
//      .pipe(
//          catchError(this.handleError('uploadFileData', []))
//      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // console.error(error); // log to console instead

      this.messageService.displayMessage('error', error);

      // Let the app keep running by returning an empty result.
       return of(result as T);
     };
   }

}
