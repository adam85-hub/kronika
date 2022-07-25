import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-logs-tile',
  templateUrl: './logs-tile.component.html',
  styleUrls: ['./logs-tile.component.scss']
})
export class LogsTileComponent implements OnInit {

  LogTypes: LogType[] = [
    new LogType("Info", "info"),
    new LogType("Errors", "error"),
    new LogType("Requests", "request")
  ]

  logContent: string = "";
  loading = false;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
  }

  selected(index: number) {
    this.resetSelected();
    this.LogTypes[index].selected = true;
    this.loading = true;

    this.logService.getLog(this.LogTypes[index].queryName).subscribe({
      next: (result) => {
        this.logContent = result;
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        alert("Wystąpił problem z pobraniem ");
      }
    });
  }

  resetSelected() {
    for (let log of this.LogTypes) {
      log.selected = false;
    }
  }

  download() {
    const selectedIndex = this.LogTypes.findIndex((x) => x.selected);
    if (selectedIndex === -1) return;

    let file = new Blob([this.logContent], { type: "text/plain;charset=utf-8" });
    saveAs(file, this.LogTypes[selectedIndex].name + ".log");

    this.resetSelected();
  }
}

class LogType {
  constructor(public name: string, public queryName: string, public selected = false) {}
}
