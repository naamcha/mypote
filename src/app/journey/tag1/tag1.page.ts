import { Component, OnInit } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-tag1',
  templateUrl: './tag1.page.html',
  styleUrls: ['./tag1.page.scss'],
})
export class Tag1Page implements OnInit {

  constructor(private vibration : Vibration) { }

  ngOnInit() {
    this.vibration.vibrate([200,100,200]);
  }

}
