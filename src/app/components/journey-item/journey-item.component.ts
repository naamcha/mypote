import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-journey-item',
  templateUrl: './journey-item.component.html',
  styleUrls: ['./journey-item.component.scss'],
})
export class JourneyItemComponent implements OnInit {
  @Input() item;

  constructor() { }

  ngOnInit() {}

}
