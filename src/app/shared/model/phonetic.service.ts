import {Injectable} from '@angular/core';
import {Phonetic} from './phonetic';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {CourseDetail} from './course-detail';
import {CourseService} from './course.service';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';

@Injectable()
export class PhoneticService {
  sdkDb: any;

  constructor(private db: AngularFireDatabase, private courseService: CourseService) {
    this.sdkDb = firebase.database().ref();
  }

  findPhoneticsByCourse(courseUrl: string) {
    return this.db.list(`course_phonetics/${courseUrl}`, {
      query: {
        orderByChild: 'order'
      }
    })
      .take(1)
      .map(results => _.sortBy(Phonetic.fromJsonList(results), 'order'));
  }

  findPhoneticsPropertyByCourse(courseUrl: string) {
    return this.db.list(`course_phonetics/${courseUrl}`, {
      query: {
        orderByChild: 'order'
      }
    }).map(results => Phonetic.fromJsonListFetchProperty(results, 'alphabet'));
  }


  createPhonetic(courseUrl: string, input: any): Observable<any> {
    let courseDetail: CourseDetail;
    let totalPhonetics = 0;
    this.courseService.getCourseDetail(courseUrl)
      .subscribe((courseInfo) => {
          courseDetail = courseInfo;
          totalPhonetics = courseDetail.phonetics;
        }
      );

    let phoneticToSave;
    let newKey;

    if (!input.key) {
      totalPhonetics = courseDetail.phonetics + 1;
      courseDetail.phonetics = totalPhonetics;
      phoneticToSave = Object.assign({},
        {phonetic: input.alphabet},
        {pronunciation: input.pronunciation},
        {writing: input.written}, {course: courseUrl}, {order: totalPhonetics});
      newKey = phoneticToSave.phonetic;
      delete(phoneticToSave.phonetic);
    } else {
      const phoneticsToDelete$ = this.db.object(`course_phonetics/${courseUrl}/${input.key}`);
      phoneticsToDelete$.remove();
      phoneticToSave = Object.assign({},
        {phonetic: input.alphabet},
        {pronunciation: input.pronunciation},
        {writing: input.written}, {course: courseUrl}, {order: input.order});
      newKey = phoneticToSave.phonetic;
    }
    const courseDetailToSave = Object.assign({}, courseDetail);
    delete(courseDetailToSave.$key);

    const dataToSave = {};
    dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    dataToSave[`course_phonetics/${courseUrl}/${newKey}`] = phoneticToSave;
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

  deletePhonetic(courseUrl: string, input: any): void {
    console.log(`input ${JSON.stringify(input)}`);
    let courseDetail: CourseDetail;
    this.courseService.getCourseDetail(courseUrl)
      .subscribe(
        courseInfo => courseDetail = courseInfo
      );

    courseDetail.phonetics = courseDetail.phonetics - 1;
    const courseDetailToSave = Object.assign({}, courseDetail);
    delete(courseDetailToSave.$key);

    const dataToSave = {};
    dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    this.firebaseUpdate(dataToSave);

    const phoneticToDelete$ = this.db.object(`course_phonetics/${courseUrl}/${input}`);
    phoneticToDelete$.remove();
  }

  updateDragOrder(courseUrl: string, startIndex: number, endIndex: number, alphabet: string) {
    const that = this;
    const indexes = [];
    let isDraggedUp = false;
    if (startIndex > endIndex) {
      isDraggedUp = true;
      for ( let i = endIndex; i <= startIndex; i++ ) {
        indexes.push(i);
      }
    } else {
      // drop down
      isDraggedUp = false;
      for ( let i = startIndex; i <= endIndex; i++ ) {
        indexes.push(i);
      }
    }
    const updateOperations = [];

    const $result = this.findPhoneticsByCourse(courseUrl)
      .map(results => {
          return results.filter((alphabetValue) => indexes.includes(alphabetValue.order));
    })
      .subscribe(
      (alphabetOrder) => {
        alphabetOrder.forEach((alphabetO) => {
          if (isDraggedUp) {
            const newOrder = alphabetO.order === startIndex ? endIndex : alphabetO.order + 1;
            const updateOrder = Object.assign({}, {order: newOrder});
            const updateAlphabet$ = this.db.object(`course_phonetics/${courseUrl}/${alphabetO.alphabet}`);
            updateOperations.push(updateAlphabet$.update(updateOrder));
          } else if (!isDraggedUp) {
            const newOrder = alphabetO.order === startIndex ? endIndex : alphabetO.order - 1;
            const updateOrder = Object.assign({}, {order: newOrder});
            const updateAlphabet$ = this.db.object(`course_phonetics/${courseUrl}/${alphabetO.alphabet}`);
            updateOperations.push(updateAlphabet$.update(updateOrder));
          }
        });

        Promise.all(updateOperations)
          .then(function () {
            console.log('all the files were created');
            that.findPhoneticsByCourse(courseUrl);
          }).catch(function () {
        });
      }
    );

  }
}
