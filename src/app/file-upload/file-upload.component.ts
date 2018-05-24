import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FileDataService } from '../service/file-data.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  title: string;
  description: string;
  file: File;
  fileInput: FileList;

  constructor(private fileDataService: FileDataService) { }

  ngOnInit() {
  }

  /**
   * Get the file to upload.
   * ngModel cannot be used with this type of input.
   */
  selectFile(event) {
    this.file = event.target.files.item(0);
  }

  /**
   * Submit the file along with title and description
   * for upload.
   * Clear the inputs after.
   */
  submit() {
    this.fileDataService.upload(this.file, this.title, this.description);
    this.file = null;
    this.title = null;
    this.description = null;
    this.fileInput = null;
  }

  /**
   * If not all the inputs have a value,
   * do not allow to upload.
   */
  isDisabled() {
      return this.file == null
        || this.description == null
        || this.title == null;
  }

}
