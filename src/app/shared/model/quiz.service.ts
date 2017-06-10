import { Injectable } from '@angular/core';
import { LessonItem } from "app/shared/model/lesson-item";

@Injectable()
export class QuizService {

  constructor() { }

  getQuizItems(lessonItems: LessonItem[]) : LessonItem[] {
    let aIndex = this.getRandomIntInclusive(0, lessonItems.length - 1);
    let answer = lessonItems[aIndex];
    if(lessonItems.length > 1) {
      lessonItems.splice(aIndex, 1);
    }
    let correctIndex = this.getRandomIntInclusive(0, 3);
    let choices : LessonItem[] = [answer];
    for (var index = 0; index < 4; index++) {
      if(index == correctIndex) {
        choices.push(answer);
      }
      let randIndex = this.getRandomIntInclusive(0, lessonItems.length - 1);
      choices.push(lessonItems[randIndex]);
      if(lessonItems.length > 1) {
        lessonItems.splice(randIndex, 1);
      }
    }
    return choices;
  }

  getRandomIntInclusive(min: number, max: number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
