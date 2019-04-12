import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';


@Component({
  selector: 'app-seg-one',
  templateUrl: './seg-one.page.html',
  styleUrls: ['./seg-one.page.scss'],
})
export class SegOnePage implements OnInit {

  constructor(private tts: TextToSpeech) { }

  ngOnInit() {
    // this.tts.speak("Pour vous rendre à l'ascenseur, veuillez utiliser les escaliers qui se trouvent à droite de l'accueil.")
    //   .then(() => console.log('Success'))
    //   .catch((reason: any) => console.log(reason));

    let text = "Pour vous rendre à l'ascenseur, veuillez utiliser les escaliers qui se trouvent à droite de l'accueil.";
    this.tts.speak({text: text, locale: 'fr-FR'})
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

}
