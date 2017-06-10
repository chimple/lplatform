import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoardComponent } from "app/learn/board.component";
import { LessonItem } from "app/shared/model/lesson-item";
import { WordService } from "app/shared/model/word.service";
import { Observable } from "rxjs/Observable";
import { Word } from "app/shared/model/word";
import { QuizService } from "app/shared/model/quiz.service";

@Component({
  selector: 'app-word-quiz',
  templateUrl: './word-quiz.component.html',
  styleUrls: ['./word-quiz.component.css']
})
export class WordQuizComponent implements BoardComponent, OnInit {
  @Input() lessonItems: LessonItem[];
  @Input() currentIndex: number;
  @Output() readyToGo = new EventEmitter<number>();

  word$: Observable<Word>;
  answer: string;
  choices: string[] = [];
  tries: number;
  constructor(private wordService: WordService, private quizService: QuizService) { }

  ngOnInit() {
    let quizItems : LessonItem[] = this.quizService.getQuizItems(
      this.lessonItems.slice(0, this.currentIndex + 1));
    this.answer = quizItems[0].item;
    this.choices = quizItems
      .slice(1, quizItems.length)
      .map((value) => {
        return value.item;
      });
  this.word$ = this.wordService.getWord(quizItems[0].item, quizItems[0].course);

  }

  checkAnswer(answer: string) {
    this.tries++;
    if(answer == this.answer) {
      this.readyToGo.emit(this.tries);
    }
  }

}
