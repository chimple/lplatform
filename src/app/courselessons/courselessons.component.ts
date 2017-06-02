import {Component, OnInit} from '@angular/core';
import {Route, ActivatedRoute} from '@angular/router';
import {CourselessonsService} from './courselessons.service';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';
import * as _ from 'lodash';
import {CourseService} from "../shared/model/course.service";
import {Observable} from "rxjs/Observable";
import {Course} from "../shared/model/course";

@Component({
  selector: 'app-courselessons',
  templateUrl: './courselessons.component.html',
  styleUrls: ['./courselessons.component.css'],
  providers: [CourselessonsService]
})
export class CourselessonsComponent implements OnInit {
  language: any;
  courseId: any;
  courseLessons = [];
  authInfo: AuthInfo;
  isCourseNotTaken: boolean = true;
  currentCourse$: Observable<Course>;

  constructor(private activatedRoute: ActivatedRoute, private courseLessonsService: CourselessonsService, private authService: AuthService, private courseService: CourseService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.courseId = params['courseId'];
    });
    this.currentCourse$ = this.courseService.getCourseInformation(this.courseId);
    localStorage.setItem('courseId', this.courseId);
    this.courseLessonsService.getCourseLessons(this.courseId).subscribe(
      (data) => {
        for ( const key in data ) {
          this.courseLessons.push(data[key]);
        }
      }
    );
    this.authService.authInfo$
      .subscribe(
        authInfo => {
          this.authInfo = authInfo;
          if (this.authInfo && this.authInfo.getUser() && this.authInfo.getUser().courses) {

            const allSubscribedCourses = _.map(this.authInfo.getUser().courses, 'courseUrl');
            this.isCourseNotTaken = !allSubscribedCourses.includes(this.courseId);
          }
        }
      );
  }

  takeTheCourse(courseId) {

  }

  subscribeTheCourse(courseId) {
    this.isCourseNotTaken = false;
    this.authService.updateRegisterCourseInformation(this.authInfo.getUser(), courseId);
  }

}
