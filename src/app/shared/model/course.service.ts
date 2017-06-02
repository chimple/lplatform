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
}
