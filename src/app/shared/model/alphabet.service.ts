import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Alphabet} from './alphabet';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';
import * as firebase from 'firebase/app';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import {CourseService} from './course.service';
import {CourseDetail} from './course-detail';

@Injectable()
export class AlphabetService {
  sdkDb: any;

  constructor(private courseService: CourseService, private db: AngularFireDatabase, private http: Http) {
    this.sdkDb = firebase.database().ref();
  }

  findAlphabetsByCourse(courseUrl: string, query: FirebaseListFactoryOpts = {query: {orderByChild: 'order'}}): Observable<Alphabet[]> {
    console.log(`findAlphabetsByCourse ${courseUrl}`);
    return this.db.list(`course_alphabets/${courseUrl}`, query)
      .map(results => Alphabet.fromJsonList(results));
  }

  loadFirstAlphabetsPage(courseUrl: string, pageSize: number): Observable<Alphabet[]> {
    return this.findAlphabetsByCourse(courseUrl, {
      query: {
        limitToFirst: pageSize,
        orderByChild: 'order'
      }
    });
  }


  loadNextPage(courseUrl: string, lastAlphabetKey: string, pageSize: number): Observable<Alphabet[]> {

    return this.findAlphabetsByCourse(courseUrl, {
      query: {
        startAt: lastAlphabetKey,
        limitToFirst: pageSize + 1,
        orderByChild: 'order'
      }
    }).map(alphabets => alphabets.slice(1, alphabets.length));
  }

  loadPreviousPage(courseUrl: string, lastAlphabetKey: string, pageSize: number): Observable<Alphabet[]> {
    return this.findAlphabetsByCourse(courseUrl, {
      query: {
        endAt: lastAlphabetKey,
        limitToLast: pageSize + 1,
        orderByChild: 'order'
      }
    }).map(alphabets => alphabets.slice(0, alphabets.length - 1));
  }


  createAlphabetForLessonItem(courseUrl: string, input: any): Observable<any> {
    const alphabetToSave = Object.assign({}, {key: input.alphabet}, {course: courseUrl});
    const newKey = input.alphabet;

    delete(alphabetToSave.key);

    const dataToSave = {};
    dataToSave[`course_alphabets/${courseUrl}/${newKey}`] = alphabetToSave;

    return this.firebaseUpdate(dataToSave);
  }

  // createAlphabet(courseUrl: string, alphabet: any, key: any = undefined,
  //                pronunciation: any , sound: any ): Observable<any> {
  createAlphabet(courseUrl: string, input: any, key: any = undefined,
                ): Observable<any> {
    let courseDetail: CourseDetail;
    this.courseService.getCourseDetail(courseUrl)
      .subscribe(
        courseInfo => courseDetail = courseInfo
      );

    const order = courseDetail.alphabets + 1;
    courseDetail.alphabets = order;

    const alphabetToSave = Object.assign({},
      {alphabet: input.alphabet},
      {course: courseUrl}, {order: order}, {pronunciation: input.pronunciation},  {sound: input.sound});
    const courseDetailToSave = Object.assign({}, courseDetail);
    delete(courseDetailToSave.$key);

    const newKey = alphabetToSave.alphabet;
    delete(alphabetToSave.alphabet);

    if (key) {
      this.deleteAlphabet(courseUrl, key);
    }

    const dataToSave = {};
    dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    dataToSave[`course_alphabets/${courseUrl}/${newKey}`] = alphabetToSave;
    return this.firebaseUpdate(dataToSave);
  }

  updateSoundLink(courseUrl: string, key: string, soundFileName: string): void {
    const alphabetUpdate$ = this.db.object(`course_alphabets/${courseUrl}/${key}`);
    alphabetUpdate$.update({sound: soundFileName});
  }

  deleteAlphabet(courseUrl: string, input: any): void {
    console.log(`input ${JSON.stringify(input)}`);
    let courseDetail: CourseDetail;
    this.courseService.getCourseDetail(courseUrl)
      .subscribe(
        courseInfo => courseDetail = courseInfo
      );

    courseDetail.alphabets = courseDetail.alphabets - 1;
    const courseDetailToSave = Object.assign({}, courseDetail);
    delete(courseDetailToSave.$key);

    const dataToSave = {};
    dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    this.firebaseUpdate(dataToSave);

    const alphabetToDelete$ = this.db.object(`course_alphabets/${courseUrl}/${input}`);
    alphabetToDelete$.remove();
  }

  updatePronunciationLink(courseUrl: string, key: string, pronunciationFileName: string): void {
    const alphabetUpdate$ = this.db.object(`course_alphabets/${courseUrl}/${key}`);
    alphabetUpdate$.update({pronunciation: pronunciationFileName});
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
