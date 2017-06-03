import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Word} from './word';
import {PhoneticService} from './phonetic.service';
import {CourseDetail} from './course-detail';
import {CourseService} from './course.service';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';

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

  deleteWord(courseUrl: string, input: any): void {
    console.log(`input ${JSON.stringify(input)}`);
    let courseDetail: CourseDetail;
    this.courseService.getCourseDetail(courseUrl)
      .subscribe(
        courseInfo => courseDetail = courseInfo
      );

    courseDetail.words = courseDetail.words - 1;
    const courseDetailToSave = Object.assign({}, courseDetail);
    delete(courseDetailToSave.$key);

    const dataToSave = {};
    dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    this.firebaseUpdate(dataToSave);

    const wordToDelete$ = this.db.object(`course_words/${courseUrl}/${input}`);
    wordToDelete$.remove();
  }

  createWord(courseUrl: string, input: any): Observable<any> {
    let courseDetail: CourseDetail;
    let courseDetailToSave;
    const isEditWord: boolean = input.key !== undefined;
    let i = 1;
    let phonetics = {};
    phonetics = _.reduce(input.phonetics, (result, item) => {
      const key = item['alphabet'];
      const val = item['phonetic'];
      const p = {};
      p['order'] = i;
      p[key] = val;
      result[i] = p;
      i++;
      return result;
    }, phonetics);

    const wordToSave = Object.assign({}, {key: input.word}, {phonetics: phonetics},
      {meaning: input.meaning}, {ref: input.ref}, {course: courseUrl}, {pronunciation: input.pronunciation}, {image: input.image});

    if (isEditWord) {
      const wordToDelete$ = this.db.object(`course_words/${courseUrl}/${input.key}`);
      wordToDelete$.remove();
      wordToSave['order'] = input.order;
    } else {

      this.courseService.getCourseDetail(courseUrl)
        .subscribe(
          courseInfo => courseDetail = courseInfo
        );

      courseDetail.words = courseDetail.words + 1;
      wordToSave['order'] = courseDetail.words;
      courseDetailToSave = Object.assign({}, courseDetail);
      delete(courseDetailToSave.$key);
    }

    delete(wordToSave.key);
    let newKey = '';
    if (input.word) {
      newKey = input.word;
    }


    const dataToSave = {};
    if (courseDetailToSave) {
      dataToSave[`course_details/${courseUrl}`] = courseDetailToSave;
    }

    dataToSave[`course_words/${courseUrl}/${newKey}`] = wordToSave;
    return this.firebaseUpdate(dataToSave);
  }

  createWordForLessonItem(courseUrl: string, input: any): Observable<any> {
    const wordToSave = Object.assign({}, {key: input.word}, {course: courseUrl}, {meaning: input.word}, {ref: input.word});
    const newKey = input.word;

    delete(wordToSave.key);

    const dataToSave = {};
    dataToSave[`course_words/${courseUrl}/${newKey}`] = wordToSave;
    const subject = new Subject();

    return this.firebaseUpdate(dataToSave);
  }

  updateImageLink(courseUrl: string, key: string, imageFileName: string): void {
    const wordUpdate$ = this.db.object(`course_words/${courseUrl}/${key}`);
    wordUpdate$.update({image: imageFileName});
  }

  updatePronunciationLink(courseUrl: string, key: string, pronunciationFileName: string): void {
    const wordUpdate$ = this.db.object(`course_words/${courseUrl}/${key}`);
    wordUpdate$.update({pronunciation: pronunciationFileName});
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

  firebaseRemove(deleteKey): Observable<any> {
    const subject = new Subject();

    this.sdkDb.remove(deleteKey)
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

