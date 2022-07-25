import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';

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

  constructor(private logService: LogService) { }

  ngOnInit(): void {
  }

  selected(index: number) {
    for (let log of this.LogTypes) {
      log.selected = false;
    }
    this.LogTypes[index].selected = true;

    this.logService.getLog(this.LogTypes[index].queryName).subscribe({
      next: (result) => {
        this.logContent = result;
      },
      error: (e) => {
        console.log(e);
        alert("Wystąpił problem z pobraniem ")
      }
    });
  }
}

class LogType {
  constructor(public name: string, public queryName: string, public selected = false) {}
}
