import { Component, OnInit } from '@angular/core';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { interval } from 'rxjs/internal/observable/interval';
import { Sites } from '../core/models/sites.model';
import { Observable, from } from 'rxjs';
import { MicroLocalisation } from '../core/models/microlocalisation.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-conf',
  templateUrl: './conf.page.html',
  styleUrls: ['./conf.page.scss'],
})
export class ConfPage implements OnInit {
  networks: HotspotNetwork[];
  constructor(
    private hotspot: Hotspot,
    private router: Router
    ) { 
    
  }

  ngOnInit() {
    interval(4000).subscribe(data => {
      this.scanWifi();
    });
  }
  scanWifi(): void {
    const scanWifi = from(this.hotspot.scanWifi()).subscribe(networks => {
      this.networks=networks.sort((a,b)=> -a.level+b.level);
    })
  };
  zonify(wifi:HotspotNetwork):void{
    this.router.navigateByUrl('associate-wifi/'+wifi.BSSID,)
  }
}
