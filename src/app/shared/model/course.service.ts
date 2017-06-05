import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Course} from './course';
import {AngularFireDatabase} from 'angularfire2/database';
import {CourseDetail} from './course-detail';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase/app';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CourseService {
  sdkDb: any;

  constructor(private db: AngularFireDatabase) {
    this.sdkDb = firebase.database().ref();
  }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses')
      .do(console.log)
      .map(Course.fromJsonList);
  }

  findAllCoursesCreatedBy(email: string): Observable<Course[]> {
    return this.db.list('courses', {
      query: {
        equalTo: email,
        orderByChild: 'creator'
      }
    })
      .do(console.log)
      .map(Course.fromJsonList);
  }


  getCourseInformation(courseUrl: string): Observable<Course> {
    console.log(courseUrl);

    return this.db.object(`courses/${courseUrl}`)
      .do(console.log)
      .map(Course.fromJson);
  }


  getCourseDetail(courseUrl: string): Observable<CourseDetail> {
    console.log(courseUrl);

    return this.db.object(`course_details/${courseUrl}`)
      .do(console.log)
      .map(CourseDetail.fromJson);
  }

  save(form: NgForm, creator: string) {
    console.log(JSON.stringify(form.value));
    const courseKey = this.sdkDb.child(`courses`).push().key;
    const courseToSave = Object.assign({}, {creator: creator}, {lang: form.value.courseLanguage},
      {name: form.value.courseName});

    const courseDetailsToSave = Object.assign({}, {alphabets: 0}, {description: form.value.courseDescription},
      {lessons: 0}, {phonetics: 0}, {words: 0});

    const dataToSave = {};
    dataToSave[`courses/${courseKey}`] = courseToSave;
    dataToSave[`course_details/${courseKey}`] = courseDetailsToSave;

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
