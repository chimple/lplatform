import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Course} from './course';
import {AngularFireDatabase} from 'angularfire2/database';
import {LessonItem} from './lesson-item';
import {Lesson} from './lesson';

@Injectable()
export class LessonService {

  constructor(private db: AngularFireDatabase) {
  }

  getLessonItems(lessonId: string): Observable<LessonItem[]> {
    console.log(lessonId);

    return this.db.list(`course_lesson_items/${lessonId}`)
      .do(console.log)
      .map(LessonItem.fromJsonList);
  }

  findAllLessonByCourse(courseUrl: string): Observable<Lesson[]> {
    return this.db.list(`course_lessons/${courseUrl}`)
      .do(console.log)
      .map(Lesson.fromJsonList);
  }
}
