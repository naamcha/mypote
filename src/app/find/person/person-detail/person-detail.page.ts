import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as peopleData from '../../../../assets/data/people.json';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {
  people;
  person;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.people = peopleData.people;

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('personId')) {
        this.navCtrl.navigateBack('/tabs/tab-bar/find/person');
        return;
      } else {
        // console.log(`personId`, paramMap.get('personId'));
        this.person = this.people.find(people => people['id'].toString() === paramMap.get('personId'));
        // console.log(`person name`, this.person.name);
      }
    });

  }

}
