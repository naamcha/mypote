import { Component, OnInit } from '@angular/core';
import * as guidesData from '../../../assets/data/guides.json';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.page.html',
  styleUrls: ['./guides.page.scss'],
})
export class GuidesPage implements OnInit {
  guides = [];

  constructor() { }

  ngOnInit() {
    this.guides = guidesData.guides;
  }

}
