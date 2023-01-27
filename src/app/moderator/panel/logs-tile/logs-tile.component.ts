import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { saveAs } from 'file-saver';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-logs-tile',
  templateUrl: './logs-tile.component.html',
  styleUrls: ['./logs-tile.component.scss']
})
export class LogsTileComponent implements OnInit {

  DownloadTypes: DownloadType[] = [
    new DownloadType("Log", "log"),
    new DownloadType("Backup", "backup"),
  ]

  loading = false;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
  }

  selected(index: number) {
    this.resetSelected();
    this.DownloadTypes[index].selected = true;
  }

  resetSelected() {
    for (let log of this.DownloadTypes) {
      log.selected = false;
    }
  }

  async download() {
    const downloadType = this.DownloadTypes.find((x) => x.selected);
    if (downloadType == undefined) throw Error("Unextpected behavior: downloadType is undefined");
    
    if (downloadType.queryName === "log") {
      this.loading = true;
      const logContent = await lastValueFrom(this.logService.getLog());
      let file = new Blob([logContent], { type: "text/plain;charset=utf-8" });
      saveAs(file, "kronika.log");
    }

    if (downloadType.queryName === "backup") {
      alert("Not implemented yet");
    }
    
    this.resetSelected();
    this.loading = false;
  }

  get isAnythingSelected() {
    for (const downloadType of this.DownloadTypes) {
      if (downloadType.selected) return true;
    }
    return false;
  }
}

class DownloadType {
  constructor(public name: string, public queryName: string, public selected = false) {}
}
