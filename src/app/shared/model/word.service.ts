import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Word} from './word';
import {PhoneticService} from './phonetic.service';
import {CourseDetail} from './course-detail';
import {CourseService} from './course.service';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase/app';

@Injectable()
export class WordService {

  sdkDb: any;
  constructor(private db: AngularFireDatabase, private phoneticService: PhoneticService, private courseService: CourseService) {
    this.sdkDb = firebase.database().ref();
  }

  findAllPhoneticsInCourse(courseUrl: string): any {
    return this.phoneticService.findPhoneticsPropertyByCourse(courseUrl);
  }

  findWordsByCourse(courseUrl: string): Observable<Word[]> {
    const result$ = this.db.list(`course_words/${courseUrl}`, {
      query: {
        orderByChild: 'ref'
      }
    }).map(results => Word.fromJsonList(results));

    result$.subscribe(console.log);

    return this.db.list(`course_words/${courseUrl}`, {
      query: {
        orderByChild: 'ref'
      }
    }).map(results => Word.fromJsonList(results));
  }

  createWord(courseUrl: string, word: any): Observable<any> {
    let courseDetail: CourseDetail;
    this.courseService.getCourseDetail(courseUrl)
      .subscribe(
        courseInfo => courseDetail = courseInfo
      );

    const order = courseDetail.alphabets + 1;
    courseDetail.alphabets = order;

    const wordToSave = Object.assign({}, word, {course: courseUrl}, {order: order});
    const courseDetailToSave = Object.assign({}, courseDetail);
    delete(courseDetailToSave.$key);

    const newKey = wordToSave.alphabet;
    delete(wordToSave.alphabet);

    const dataToSave = {};
    dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    dataToSave[`course_alphabets/${courseUrl}/${newKey}`] = wordToSave;
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

