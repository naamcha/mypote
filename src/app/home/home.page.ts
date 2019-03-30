import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonItemSliding, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
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
export class HomePage implements OnInit {
  closed = false;

  constructor(
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

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

}
