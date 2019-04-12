import { Component, OnInit } from '@angular/core';
import * as peopleData from '../../../assets/data/people.json';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {
  people;

  constructor() { }

  ngOnInit() {
    this.people = peopleData.people;
  }

}

