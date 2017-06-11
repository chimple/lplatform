import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from 'angularfire2/database';
import {Lesson} from '../shared/model/lesson';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class CourselessonsService {
  constructor(private _http: Http, private db: AngularFireDatabase) {
  }

  getCourseLessons(courseId: string): Observable<Lesson[]> {
    return this.db.list(`course_lessons/${courseId}`)
      .do(console.log)
      .map(results => _.sortBy(Lesson.fromJsonList(results), 'order'));
  }
}



