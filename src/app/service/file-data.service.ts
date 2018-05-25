import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { FileData } from '../model/file-data';
import { MessageService } from './message.service';

const fileDataUrl = '//localhost:8080/api/file-data';
const uploadUrl = fileDataUrl + '/upload';

@Injectable({
  providedIn: 'root',
})
export class FileDataService {

  fileDataList: FileData[];

  constructor(
      private http: HttpClient,
      private messageService: MessageService
   ) { }

  /**
   * Get the fileDataList from the server.
   * If an error occurs, display it
   * using the message service.
   */
  getFileDataList(): void {
    this.http.get<FileData[]>(fileDataUrl)
       .subscribe(
         result => {
           this.fileDataList = this.sortByDateDesc(result);
        }, error => {
          this.messageService.displayMessage('error', error.error.message);
        }, () => {
          // On complete
        });
  }

  /**
   * Upload a fileData to the server.
   * If an error occurs, display it
   * using the message service.
   *
   * @param file the file to upload
   * @param title the title of the file
   * @param description the description of the file
   */
  upload(file: File, title: string, description: string): void {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    this.http.post<FileData>(uploadUrl, formData)
      .subscribe(
        result => {
          const message = 'File with id ' + result.id + ' was uploaded';
          this.messageService.displayMessage('success', message);
          this.fileDataList.push(result);
          this.fileDataList = this.sortByDateDesc(this.fileDataList);
        }, error => {
          this.messageService.displayMessage('error', error.error.message);
        }, () => {
          // On complete
        });
  }

  /**
   * Sort a fileData array by creationDate descending.
   * A custom pipe may be able to be used instead.
   *
   * @param fileDataList the fileData array to sort
   */
  sortByDateDesc(fileDataList: FileData[]) {
    fileDataList.sort((a, b) => {
      if (a.creationDate > b.creationDate) {
        return -1;
      } else if (a.creationDate < b.creationDate) {
        return 1;
      } else {
        return 0;
      }
    });
    return fileDataList;
  }

}
