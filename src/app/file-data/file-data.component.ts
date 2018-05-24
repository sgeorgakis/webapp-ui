import { Component, OnInit } from '@angular/core';
import { FileDataService } from '../service/file-data.service';

@Component({
  selector: 'app-file-data',
  templateUrl: './file-data.component.html',
  styleUrls: ['./file-data.component.css']
})
export class FileDataComponent implements OnInit {

    constructor(private fileDataService: FileDataService) {
    }

    ngOnInit() {
      this.getFileDatas();
    }

    /**
     * Get the already saved fileDatas 
     */
    getFileDatas(): void {
      this.fileDataService.getFileDatas();
    }

    /**
     * Check if there are fileDatas to show.
     * If not, do not show the table.
     */
    shouldBeVisible(): boolean {
      return this.fileDataService.fileDatas != null && this.fileDataService.fileDatas.length > 0;
    }

}
