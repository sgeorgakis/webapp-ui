import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { FileData } from '../model/file-data';
import { MessageService } from './message.service';

import { FILE_DATA_URL, UPLOAD_URL } from '../../assets/constants';
import { SUCCESSFUL_UPLOAD_MESSAGE, SERVER_UNREACHABLE_MESSAGE } from '../../assets/constants';
import { SUCCESSFUL_MESSAGE_TYPE, ERROR_MESSAGE_TYPE } from '../../assets/constants';

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
    this.http.get<FileData[]>(FILE_DATA_URL)
       .subscribe(
         result => {
           this.fileDataList = this.sortByDateDesc(result);
        }, error => {
           this.handleError(error);
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

    this.http.post<FileData>(UPLOAD_URL, formData)
      .subscribe(
        result => {
          this.messageService.displayMessage(SUCCESSFUL_MESSAGE_TYPE, SUCCESSFUL_UPLOAD_MESSAGE + result.id);
          this.fileDataList.push(result);
          this.fileDataList = this.sortByDateDesc(this.fileDataList);
        }, error => {
          this.handleError(error);
        });
  }

  /**
   * Handles the error response from server
   * and displays the appropriate message to the user
   *
   * @param error the error response
   */
  handleError(error) {
    if (error.status === 0) {
      this.messageService.displayMessage(ERROR_MESSAGE_TYPE, SERVER_UNREACHABLE_MESSAGE);
    } else {
      this.messageService.displayMessage(ERROR_MESSAGE_TYPE, error.error.message);
    }
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
