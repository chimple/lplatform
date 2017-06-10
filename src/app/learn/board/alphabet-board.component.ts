import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LessonItem } from "app/shared/model/lesson-item";
import { AlphabetService } from "app/shared/model/alphabet.service";
import { Alphabet } from "app/shared/model/alphabet";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { BoardComponent } from "app/learn/board.component";

@Component({
  selector: 'app-alphabet-board',
  templateUrl: './alphabet-board.component.html',
  styleUrls: ['./alphabet-board.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale(2.0)'
        }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s 10 ease-out', style({
          opacity: 0,
          transform: 'scale(0.5)'
        }))
      ])
    ])
]
  
})
export class AlphabetBoardComponent implements OnInit, BoardComponent {
  readyToGo: EventEmitter<number>;
  @Input() lessonItems: LessonItem[];
  @Input() currentIndex: number;
  alphabet$: Observable<Alphabet>;

  constructor(private alphabetService: AlphabetService) { }

  ngOnInit() {
    this.alphabet$ = this.alphabetService.getAlphabet(this.lessonItems[this.currentIndex].item, this.lessonItems[this.currentIndex].course);
  }

  animationStarted() {
    console.log('animation');
  }

}
