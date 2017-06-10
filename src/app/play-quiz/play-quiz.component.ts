import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {
  @Input() filedata: any;
  constructor() { }

  ngOnInit() {
  }
  playaudio(audiosrc: string) {
    const audio = new Audio();
    audio.src = audiosrc;
    audio.load();
    audio.play();
  }
}
