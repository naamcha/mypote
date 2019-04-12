import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-seg-two',
  templateUrl: './seg-two.page.html',
  styleUrls: ['./seg-two.page.scss'],
})
export class SegTwoPage{

  constructor(private tts: TextToSpeech) { }
 
  ionViewDidEnter() {
    let text = "Pour vous rendre à la salle Mediasquaype, dirigez vous vers le patio et tournez à droite. La salle se trouve au niveau de la seconde porte sur la gauche.";
    this.tts.speak({text: text, locale: 'fr-FR'})
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

}
