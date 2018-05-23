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

  constructor(private fileDataService: FileDataService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.file = event.target.files.item(0);
  }

  selectTitle(event) {
    this.title = event.target.value;
  }

  selectDescription(event) {
    this.description = event.target.value;
  }

  submit() {
    this.fileDataService.upload(this.file, this.title, this.description);
    this.file = undefined;
    this.title = undefined;
    this.description = undefined;
  }

}
