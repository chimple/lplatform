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
import {WordService} from "./word.service";
import {Word} from "./word";
import {AlphabetService} from "./alphabet.service";


@Injectable()
export class LessonService {

  sdkDb: any;
  courseKey: any;

  constructor(private db: AngularFireDatabase, private courseService: CourseService, private wordService: WordService, private alphabetService: AlphabetService) {
    this.sdkDb = firebase.database().ref();
  }

  getLessonItemsForSession(lessonId: string): Observable<LessonItem[]> {
    console.log(lessonId);

    return this.db.list(`course_lesson_items/${lessonId}`)
      .do(console.log)
      .take(1)
      .map(LessonItem.fromJsonList);
  }

  updateImageLink(courseUrl: string, key: string, imageFileName: string): void {
    const lessonUpdate$ = this.db.object(`course_lessons/${courseUrl}/${key}`);
    lessonUpdate$.update({image: imageFileName});
  }


  getLessonItems(lessonId: string): Observable<LessonItem[]> {
    console.log(lessonId);

    return this.db.list(`course_lesson_items/${lessonId}`)
      .do(console.log)
      .map(LessonItem.fromJsonList);
  }

  getLessonForSession(lessonId: string, courseId: string): Observable<Lesson> {
    console.log(lessonId);

    return this.db.object(`course_lessons/${courseId}/${lessonId}`)
      .do(console.log)
      .take(1)
      .map(Lesson.fromJson);
  }


  getLesson(lessonId: string, courseId: string): Observable<Lesson> {
    console.log(lessonId);

    return this.db.object(`course_lessons/${courseId}/${lessonId}`)
      .do(console.log)
      .map(Lesson.fromJson);
  }

  findAllLessonByCourse(courseUrl: string): Observable<Lesson[]> {
    return this.db.list(`course_lessons/${courseUrl}`)
      .do(console.log)
      .map(Lesson.fromJsonList);
  }

  deleteLesson(courseUrl: string, input: any): void {
    console.log(`input ${JSON.stringify(input)}`);
    let courseDetail: CourseDetail;
    this.courseService.getCourseDetail(courseUrl)
      .subscribe(
        courseInfo => courseDetail = courseInfo
      );

    courseDetail.lessons = courseDetail.lessons - 1;
    const courseDetailToSave = Object.assign({}, courseDetail);
    delete(courseDetailToSave.$key);

    const dataToSave = {};
    dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    this.firebaseUpdate(dataToSave);

    const lessonToDelete$ = this.db.object(`course_lessons/${courseUrl}/${input}`);
    lessonToDelete$.remove();
  }

  createLesson(courseUrl: string, input: any): Observable<any> {
    const editLesson: boolean = input.lesson !== undefined;
    let order;
    let courseDetailToSave;
    let newKey;
    if (editLesson) {
      order = input.order;
      newKey = input.lesson;
    } else {
      let courseDetail: CourseDetail;
      this.courseService.getCourseDetail(courseUrl)
        .subscribe(
          courseInfo => courseDetail = courseInfo
        );
      order = courseDetail.lessons + 1;
      courseDetail.lessons = order;

      courseDetailToSave = Object.assign({}, courseDetail);
      delete(courseDetailToSave.$key);
      newKey = this.sdkDb.child(`course_lessons`).push().key;
    }


    let lessonToSave;
    if (input.phonetic) {
      lessonToSave = Object.assign({}, {phonetic: input.phonetic}, {name: input.name}, {teach: input.teach}, {course: courseUrl}, {order: order});
    } else {
      lessonToSave = Object.assign({}, {name: input.name}, {teach: input.teach}, {course: courseUrl}, {order: order});
    }

    const dataToSave = {};
    if (courseDetailToSave) {
      dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    }

    dataToSave[`course_lessons/${courseUrl}/${newKey}`] = lessonToSave;
    return this.firebaseUpdate(dataToSave);
  }

  createLessonItem(courseUrl: string, lessonUrl: string, input: any, type: string, attributeExists = false): Observable<any> {
    const editLesson: boolean = input.lesson !== undefined;

    let lessonItemToSave;

    // const newKey = this.sdkDb.child(`course_lesson_items/${courseUrl}`).push().key;
    let newKey;

    if (input.word) {
      lessonItemToSave = Object.assign({}, {item: input.word}, {lesson: lessonUrl}, {course: courseUrl});
      newKey = input.word;
    } else if (input.alpha) {
      lessonItemToSave = Object.assign({}, {item: input.alpha}, {lesson: lessonUrl}, {course: courseUrl});
      newKey = input.alpha;
    }

    const dataToSave = {};
    dataToSave[`course_lesson_items/${lessonUrl}/${newKey}`] = lessonItemToSave;

    // if (!attributeExists) {
    //   if (type === 'word') {
    //     this.wordService.createWordForLessonItem(courseUrl, input);
    //   } else if (type === 'alphabet') {
    //     this.alphabetService.createAlphabetForLessonItem(courseUrl, input);
    //   }
    // }
    return this.firebaseUpdate(dataToSave);
  }

  deleteLessonWord(lesson$key, lessonItem$key) {
    const dataToSave = {};
    const lessonWordToDelete$ = this.db.object(`course_lesson_items/${lesson$key}/${lessonItem$key}`);
    lessonWordToDelete$.remove();
  }

  deleteLessonAlpha(lesson$key, lessonItem$key) {
    const dataToSave = {};
    const lessonWordToDelete$ = this.db.object(`course_lesson_items/${lesson$key}/${lessonItem$key}`);
    lessonWordToDelete$.remove();

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
