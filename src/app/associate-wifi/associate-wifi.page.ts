import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-associate-wifi',
  templateUrl: './associate-wifi.page.html',
  styleUrls: ['./associate-wifi.page.scss'],
})
export class AssociateWifiPage implements OnInit {

  constructor(private route: ActivatedRoute,private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('wifiId')) {
        this.navCtrl.navigateBack('conf');
        return;
      }
    })
  }

}
