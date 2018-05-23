import { Component, OnInit } from '@angular/core';
import { FileData } from '../model/file-data';
import { FileDataService } from '../service/file-data.service';

@Component({
  selector: 'app-file-data',
  templateUrl: './file-data.component.html',
  styleUrls: ['./file-data.component.css']
})
export class FileDataComponent implements OnInit {

    isVisible: boolean;
    fileDatas: FileData[];

    constructor(private fileDataService: FileDataService) {
    }

    ngOnInit() {
      this.getFileDatas();
      this.isVisible = false;
    }

    getFileDatas(): void {
      this.fileDataService.getFileDatas()
      .subscribe(fileDatas => {
        this.fileDatas = fileDatas;
        this.fileDatas = this.sort(fileDatas);
        this.isVisible = this.fileDatas.length > 0;
      });
    }

    shouldBeVisible() {
      this.isVisible = this.fileDatas != null && this.fileDatas.length > 0;
      console.info(this.fileDatas == null);
      console.info(this.isVisible);
    }

    sort(fileDatas: FileData[]) {
      fileDatas.sort((a, b) => {
        if (a.creationDate > b.creationDate) {
          return -1;
        } else if (a.creationDate < b.creationDate) {
          return 1;
        } else {
          return 0;
        }
      });
      return fileDatas;
    }

}
