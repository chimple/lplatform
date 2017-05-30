import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Course} from './course';
import {AngularFireDatabase} from 'angularfire2/database';
import {CourseDetail} from './course-detail';

@Injectable()
export class CourseService {

  constructor(private db: AngularFireDatabase) {
  }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses')
      .do(console.log)
      .map(Course.fromJsonList);
  }


  getCourseDetail(courseUrl: string): Observable<CourseDetail> {
    console.log(courseUrl);

    return this.db.object(`course_details/${courseUrl}`)
      .do(console.log)
      .map(CourseDetail.fromJson);
  }
}
