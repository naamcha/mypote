import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';


@Component({
  selector: 'app-seg-one',
  templateUrl: './seg-one.page.html',
  styleUrls: ['./seg-one.page.scss'],
})
export class SegOnePage{

  constructor(private tts: TextToSpeech) { }

  ionViewDidEnter(){
     let text = "Pour vous rendre à l'ascenseur, veuillez utiliser les escaliers qui se trouvent à droite de l'accueil. Passez la porte et badgez; les ascensseurs se trouvent devant vous, deux sur votre droite et deux sur votre gauche.";
    this.tts.speak({text: text, locale: 'fr-FR'})
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }
}
