import { Component, OnInit } from '@angular/core';
import { FileData } from '../model/file-data';
import { FileDataService } from '../service/file-data.service';

@Component({
  selector: 'app-file-data',
  templateUrl: './file-data.component.html',
  styleUrls: ['./file-data.component.css']
})
export class FileDataComponent implements OnInit {

    fileDatas: FileData[];

    constructor(private fileDataService: FileDataService) {
    }

    ngOnInit() {
      this.getFileDatas();
    }

    getFileDatas(): void {
      this.fileDataService.getFileDatas()
      .subscribe(fileDatas => this.fileDatas = fileDatas);
    }

}
