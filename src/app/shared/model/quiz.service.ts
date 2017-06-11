import { Injectable } from '@angular/core';
import { LessonItem } from "app/shared/model/lesson-item";

@Injectable()
export class QuizService {

  constructor() { }

  getQuizItems(lessonItems: LessonItem[], reviewItem: LessonItem) : LessonItem[] {
    console.log(lessonItems);
    console.log(reviewItem);
    const reviewIndex = lessonItems.findIndex(obj => obj.item === reviewItem.item);
    if(reviewIndex >= 0 && lessonItems.length > 1) {
      lessonItems.splice(reviewIndex, 1);
    }
    let correctIndex = this.getRandomIntInclusive(0, 3);
    let choices : LessonItem[] = [];
    for (var index = 0; index < 4; index++) {
      if(index == correctIndex) {
        choices.push(reviewItem);
      } else {
        let randIndex = this.getRandomIntInclusive(0, lessonItems.length - 1);
        choices.push(lessonItems[randIndex]);
        if(lessonItems.length > 1) {
          lessonItems.splice(randIndex, 1);
        }
      }
    }
    console.log(choices);
    return choices;
  }

  getRandomIntInclusive(min: number, max: number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
