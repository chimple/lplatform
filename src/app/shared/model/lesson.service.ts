import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Course} from './course';
import {AngularFireDatabase} from 'angularfire2/database';
import {LessonItem} from './lesson-item';
import {Lesson} from './lesson';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import {CourseDetail} from "./course-detail";
import {CourseService} from "./course.service";


@Injectable()
export class LessonService {

  sdkDb: any;
  constructor(private db: AngularFireDatabase, private courseService: CourseService) {
    this.sdkDb = firebase.database().ref();
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

  createLesson(courseUrl: string, input: any): Observable<any> {
    let courseDetail: CourseDetail;
    this.courseService.getCourseDetail(courseUrl)
      .subscribe(
        courseInfo => courseDetail = courseInfo
      );

    const order = courseDetail.lessons + 1;
    courseDetail.lessons = order;

    const courseDetailToSave = Object.assign({}, courseDetail);
    delete(courseDetailToSave.$key);
    const lessonToSave = Object.assign({}, {phonetic: input.phonetic}, {name: input.name}, {teach: input.teach}, {course: courseUrl}, {order: order});

    const newKey = this.sdkDb.child(`course_lessons`).push().key;

    const dataToSave = {};
    dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    dataToSave[`course_lessons/${courseUrl}/${newKey}`] = lessonToSave;
    const subject = new Subject();

    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave): Observable<any> {
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err => {
          subject.error(err);
          subject.complete();
        }
      );

    return subject.asObservable();
  }
}
