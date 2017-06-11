import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  @Input() filedata: any;

  constructor() {
  }

  ngOnInit() {
     this.playaudio(this.filedata.source);
 }

  playaudio(audiosrc: string) {
    const audio = new Audio();
    audio.src = audiosrc;
    audio.load();
    audio.play();
  }

}
