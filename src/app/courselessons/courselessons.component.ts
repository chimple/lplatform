import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {CourselessonsService} from './courselessons.service';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';
import * as _ from 'lodash';
import {CourseService} from "../shared/model/course.service";
import {Observable} from "rxjs/Observable";
import {Course} from "../shared/model/course";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-courselessons',
  templateUrl: './courselessons.component.html',
  styleUrls: ['./courselessons.component.css'],
  providers: [CourselessonsService]
})
export class CourselessonsComponent implements OnInit {
  language: any;
  courseId: any;
  courseLessons$: Observable<Lesson[]>;
  authInfo: AuthInfo;
  isCourseNotTaken: boolean = true;
  currentCourse$: Observable<Course>;

  constructor(private activatedRoute: ActivatedRoute,private router:Router, private courseLessonsService: CourselessonsService, private authService: AuthService, private courseService: CourseService) {
  
}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.courseId = params['courseId'];
      this.currentCourse$ = this.courseService.getCourseInformation(this.courseId);
      this.courseLessons$ = this.courseLessonsService.getCourseLessons(this.courseId);
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
    });
  }

  takeTheCourse(courseId) {
    localStorage.setItem('courseId', courseId);
  }

  subscribeTheCourse(courseId) {
    this.isCourseNotTaken = false;
    this.authService.updateRegisterCourseInformation(this.authInfo.getUser(), courseId);
  }

}
