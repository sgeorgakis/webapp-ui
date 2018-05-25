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
      this.getFileDataList();
    }

    /**
     * Get the already saved fileDataList
     */
    getFileDataList(): void {
      this.fileDataService.getFileDataList();
    }

    /**
     * Check if there are fileData to show.
     * If not, do not show the table.
     */
    shouldBeVisible(): boolean {
      return this.fileDataService.fileDataList != null && this.fileDataService.fileDataList.length > 0;
    }

}
