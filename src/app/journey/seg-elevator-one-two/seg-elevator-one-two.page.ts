import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-seg-elevator-one-two',
  templateUrl: './seg-elevator-one-two.page.html',
  styleUrls: ['./seg-elevator-one-two.page.scss'],
})
export class SegElevatorOneTwoPage {

  constructor(private tts: TextToSpeech) { }
 
  ionViewDidEnter() {
    let text = "Rendez vous au huitième étage. Si vous êtes pressé, appuyez sur le bouton de fermeture des portes";
    this.tts.speak({text: text, locale: 'fr-FR'})
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

}
