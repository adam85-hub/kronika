import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger("anim", [
      state("shown", style({
        transform: "translateY(0px) translateX(-50%)",
        opacity: 1
      })),
      state("hidden", style({
        transform: "translateY(100%) translateX(-50%)",
        opacity: 0
      })),
      transition("shown <=> hidden", [animate('0.3s 0ms ease-out')])
    ])
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {

  @Input() show = new Observable();
  @Input() text = "empty";
  @Input() color: "blue" | "red" | "green" = "green";

  shown = false;
  display = "none";

  private shownSubscription?: Subscription;

  get animState(): string {    
    return this.shown ? "shown" : "hidden";
  }

  constructor() { }

  ngOnInit(): void {
    this.shownSubscription = this.show.subscribe(async () => {
      this.display = "block";
      await wait(10);
      this.shown = true;
      await wait(1500);
      this.shown = false;
      await wait(510);
      this.display = "none";
    })
  }

  ngOnDestroy(): void {
    this.shownSubscription?.unsubscribe();
  }
}

function wait(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved")
    }, time)
  })
}
