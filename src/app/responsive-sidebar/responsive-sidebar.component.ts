import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Links, InneLinks } from '../links';

@Component({
  selector: 'app-responsive-sidebar',
  templateUrl: './responsive-sidebar.component.html',
  styleUrls: ['./responsive-sidebar.component.scss']
})
export class ResponsiveSidebarComponent implements OnInit {

  @Output() close = new EventEmitter();
  Links = [...Links, ...InneLinks];

  constructor() { }

  ngOnInit(): void {
  }

  closeBtnClicked() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar == undefined) throw Error("Sidebar is undefined!");
    sidebar.classList.add("slide-out");

    setTimeout(() => {
      this.close.emit();
      sidebar.classList.remove("slide-out");
    }, 650);
  }
}
