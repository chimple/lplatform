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
import * as _ from 'lodash';

@Injectable()
export class AlphabetService {
  sdkDb: any;

  constructor(private courseService: CourseService, private db: AngularFireDatabase, private http: Http) {
    this.sdkDb = firebase.database().ref();
  }

  getAlphabet(alphabet: string, courseUrl: string) : Observable<Alphabet> {
    return this.db.object(`course_alphabets/${courseUrl}/${alphabet}`)
      .do(console.log)
      .map(Alphabet.fromJson);
  }

  findAlphabetsByCourse(courseUrl: string, query: FirebaseListFactoryOpts = {query: {orderByChild: 'order'}}): Observable<Alphabet[]> {
    console.log(`findAlphabetsByCourse ${courseUrl}`);
    return this.db.list(`course_alphabets/${courseUrl}`, query)
      .map(results => _.sortBy(Alphabet.fromJsonList(results), 'order'));
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

  createAlphabet(courseUrl: string, input: any): Observable<any> {
    let courseDetail: CourseDetail;
    let totalAlphabets;
    this.courseService.getCourseDetail(courseUrl)
      .subscribe(
        courseInfo => {
          courseDetail = courseInfo;
          totalAlphabets = courseDetail.alphabets;
        }
      );

    // create case
    let alphabetToSave;
    let newKey;
    if (input.alphabet && (!input.pronunciation || !input.sound)) {
      totalAlphabets = courseDetail.alphabets + 1;
      courseDetail.alphabets = totalAlphabets;
      alphabetToSave = Object.assign({}, {alphabet: input.alphabet}, {course: courseUrl}, {order: totalAlphabets});
      newKey = alphabetToSave.alphabet;
      delete(alphabetToSave.alphabet);
    } else {
      if (input.key) {
        const alphabetToDelete$ = this.db.object(`course_alphabets/${courseUrl}/${input.key}`);
        alphabetToDelete$.remove();
      }
      alphabetToSave = Object.assign({}, {alphabet: input.alphabetName}, {course: courseUrl}, {order: input.order});
      if (input.pronunciation) {
        alphabetToSave['pronunciation'] = input.pronunciation;
      }
      if (input.sound) {
        alphabetToSave['sound'] = input.sound;
      }

      newKey = alphabetToSave.alphabet;
      delete(alphabetToSave.alphabet);
    }


    const courseDetailToSave = Object.assign({}, courseDetail);
    delete(courseDetailToSave.$key);


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

    const $result = this.findAlphabetsByCourse(courseUrl, {
      query: {
        orderByChild: 'order'
      }
    }).map(results => {
      return results.filter((alphabetValue) => indexes.includes(alphabetValue.order));
    });

    const updateOperations = [];
    $result.subscribe(
      (alphabetOrder) => {
        alphabetOrder.forEach((alphabetO) => {
          if (isDraggedUp) {
            const newOrder = alphabetO.order === startIndex ? endIndex : alphabetO.order + 1;
            const updateOrder = Object.assign({}, {order: newOrder});
            const updateAlphabet$ = this.db.object(`course_alphabets/${courseUrl}/${alphabetO.alphabet}`);
            updateOperations.push(updateAlphabet$.update(updateOrder));
          } else if (!isDraggedUp) {
            const newOrder = alphabetO.order === startIndex ? endIndex : alphabetO.order - 1;
            const updateOrder = Object.assign({}, {order: newOrder});
            const updateAlphabet$ = this.db.object(`course_alphabets/${courseUrl}/${alphabetO.alphabet}`);
            updateOperations.push(updateAlphabet$.update(updateOrder));
          }
        });
      }
    );

    Promise.all(updateOperations)
      .then(function () {
        console.log('all the files were created');
        this.findAlphabetsByCourse(courseUrl);
      }).catch(function () {
    });
  }
}
