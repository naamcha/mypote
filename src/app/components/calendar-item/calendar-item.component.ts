import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 1, transform: 'translateY(0)' }),
      ]),
      transition(':leave', [
        animate('.2s', style({ opacity: 0, marginTop: '-120px', display: 'none' }))
      ])
    ])
  ]
})
export class CalendarItemComponent implements OnInit {
  closed = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  postpone(el: IonItemSliding) {
    this.closeSlidingElement(el);
  }

  cancelReminder(el: IonItemSliding) {
    this.closeSlidingElement(el);
  }

  closeSlidingElement(element): void {
    element.closeOpened();
    this.closed = true;
  }

  onNavigateToDetail() {
    this.router.navigateByUrl('/tabs/tab-bar/home/meeting-detail');
  }
}
