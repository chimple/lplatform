import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { LessonItem } from "app/shared/model/lesson-item";
import { Word } from "app/shared/model/word";
import { WordService } from "app/shared/model/word.service";
import { Observable } from "rxjs/Observable";
import { BoardComponent } from "app/learn/board.component";

@Component({
  selector: 'app-word-board',
  templateUrl: './word-board.component.html',
  styleUrls: ['./word-board.component.css']
})
export class WordBoardComponent implements OnInit, BoardComponent {
  @Output() readyToGo = new EventEmitter<number>();
  @Input() lessonItems: LessonItem[];
  @Input() reviewItem: LessonItem;
  @Input() currentIndex: number;
  word$: Observable<Word>;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.word$ = this.wordService.getWord(this.lessonItems[this.currentIndex].item, this.lessonItems[this.currentIndex].course);
  }

}
