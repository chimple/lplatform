import { Component, Input } from '@angular/core';
import { BoardComponent } from './board.component';
import { LessonItem } from "app/shared/model/lesson-item";

@Component({
  selector: 'app-alphabet-board',
  templateUrl: './alphabet-board.component.html',
  styleUrls: ['./alphabet-board.component.css']
})
export class AlphabetBoardComponent implements BoardComponent {
  @Input() lessonItem: LessonItem;

  constructor() { }

}
