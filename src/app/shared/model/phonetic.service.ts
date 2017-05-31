import {Injectable} from '@angular/core';
import {Phonetic} from './phonetic';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {CourseDetail} from './course-detail';
import {CourseService} from './course.service';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase/app';


@Injectable()
export class PhoneticService {
  sdkDb: any;

  constructor(private db: AngularFireDatabase, private courseService: CourseService) {
    this.sdkDb = firebase.database().ref();
  }

  findPhoneticsByCourse(courseUrl: string) {
    console.log(`findPhoneticsByCourse ${courseUrl}`);
    return this.db.list(`course_phonetics/${courseUrl}`, {
      query: {
        orderByChild: 'order'
      }
    }).map(results => Phonetic.fromJsonList(results));
  }

  findPhoneticsPropertyByCourse(courseUrl: string) {
    console.log(`findPhoneticsByCourse ${courseUrl}`);

    // const result$ = this.db.list(`course_phonetics/${courseUrl}`, {
    //   query: {
    //     orderByChild: 'order'
    //   }
    // }).map(results => Phonetic.fromJsonListFetchProperty(results, 'alphabet'));
    //
    // result$.subscribe(console.log);

    return this.db.list(`course_phonetics/${courseUrl}`, {
      query: {
        orderByChild: 'order'
      }
    }).map(results => Phonetic.fromJsonListFetchProperty(results, 'alphabet'));
  }


  createPhonetic(courseUrl: string, input: any): Observable<any> {
    let courseDetail: CourseDetail;
    this.courseService.getCourseDetail(courseUrl)
      .subscribe(
        courseInfo => courseDetail = courseInfo
      );

    const order = courseDetail.phonetics + 1;
    courseDetail.phonetics = order;

    const courseDetailToSave = Object.assign({}, courseDetail);
    delete(courseDetailToSave.$key);

    const phoneticToSave = Object.assign({}, {phonetic: input.phonetics}, {writing: input.written}, {course: courseUrl}, {order: order});

    const newKey = phoneticToSave.phonetic;
    delete(phoneticToSave.phonetic);

    const dataToSave = {};
    dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    dataToSave[`course_phonetics/${courseUrl}/${newKey}`] = phoneticToSave;
    const subject = new Subject();

    return this.firebaseUpdate(dataToSave);
  }

  updatePronunciationLink(courseUrl: string, key: string, pronunciationFileName: string): void {
    const phoneticUpdate$ = this.db.object(`course_phonetics/${courseUrl}/${key}`);
    phoneticUpdate$.update({pronunciation: pronunciationFileName});
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
