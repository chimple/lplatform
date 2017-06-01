import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
@Input() filedata: any;
  constructor() { }

  ngOnInit() {
  }
  playaudio(audiosrc: string){
  	var audio = new Audio();     
  	audio.src = audiosrc ;
    audio.load();
    audio.play();
  }

}
