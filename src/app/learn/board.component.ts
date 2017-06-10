import { LessonItem } from "app/shared/model/lesson-item";
import { EventEmitter } from "@angular/core";

export interface BoardComponent {
  lessonItems: LessonItem[];
  reviewItem: LessonItem;
  currentIndex: number;
  readyToGo: EventEmitter<number>;
}
