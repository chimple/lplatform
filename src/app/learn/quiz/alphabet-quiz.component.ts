import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoardComponent } from "app/learn/board.component";
import { LessonItem } from "app/shared/model/lesson-item";
import { AlphabetService } from "app/shared/model/alphabet.service";
import { Observable } from "rxjs/Observable";
import { Alphabet } from "app/shared/model/alphabet";
import { QuizService } from "app/shared/model/quiz.service";
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-alphabet-quiz',
  templateUrl: './alphabet-quiz.component.html',
  styleUrls: ['./alphabet-quiz.component.css'],
  animations: [
    trigger('AnimatedStyle', [

      state('in', style({opacity: 1, transform: 'translateX(0)'})),

      transition('void => *', [
        style({
          opacity: 0, transform: 'translateX(-100px)', backgroundColor: '#5EFF16'
        }),
        animate(500)]),

      transition('* => void', [
        group([
          animate(300, style({
            color: 'white', backgroundColor: '#FF090C', opacity: 0.5
          })),
          animate(300, style({
            transform: 'translateX(100px)', opacity: 0
          }))])


      ])
    ])
  ]
})
export class AlphabetQuizComponent implements BoardComponent, OnInit {
  @Input() lessonItems: LessonItem[];
  @Input() reviewItem: LessonItem;
  @Input() currentIndex: number;
  @Output() readyToGo = new EventEmitter<number>();

  alphabet$: Observable<Alphabet>;
  answer: string;
  choices: string[] = [];
  tries: number;
  constructor(private alphabetService: AlphabetService, private quizService: QuizService) { }

  ngOnInit() {
    let quizItems : LessonItem[] = this.quizService.getQuizItems(
      this.lessonItems.slice(0, this.currentIndex + 1), this.reviewItem);
    this.answer = this.reviewItem.item;
    this.choices = quizItems
      .slice(1, quizItems.length)
      .map((value) => {
        return value.item;
      });
    this.alphabet$ = this.alphabetService.getAlphabet(quizItems[0].item, quizItems[0].course);
  }

  checkAnswer(answer: string) {
    this.tries++;
    if(answer == this.answer) {
      this.readyToGo.emit(this.tries);
    }
  }

}
