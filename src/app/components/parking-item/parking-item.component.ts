import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parking-item',
  templateUrl: './parking-item.component.html',
  styleUrls: ['./parking-item.component.scss'],
})
export class ParkingItemComponent implements OnInit {
  @Input() parking;

  constructor() { }

  ngOnInit() {}

}
