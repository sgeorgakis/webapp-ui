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
  file: FileList;

  constructor(private fileDataService: FileDataService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.file = event.target.files;
  }

  selectTitle(event) {
    this.title = event.target.value;
  }

  selectDescription(event) {
    this.description = event.target.description;
  }

  submit() {
    this.fileDataService.upload(this.file.item(0), this.title, this.description);
    this.file = undefined;
    this.title = undefined;
    this.description = undefined;
  }

}
