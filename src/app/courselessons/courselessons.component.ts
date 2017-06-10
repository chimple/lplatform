import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourselessonsService} from './courselessons.service';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';
import * as _ from 'lodash';
import {CourseService} from '../shared/model/course.service';
import {Observable} from 'rxjs/Observable';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import {UserCourse} from "../shared/security/user-course";

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
  isCourseNotTaken = true;
  currentCourse$: Observable<Course>;
  maxLessonIndexToOpen = 0;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private courseLessonsService: CourselessonsService, private authService: AuthService,
              private courseService: CourseService) {
  }

  ngOnInit() {
    const that = this;
    this.currentCourse$ = this.activatedRoute.params
      .switchMap((params) => {
        that.courseId = params['courseId']
        return that.courseService.getCourseInformation(params['courseId']);
      });

    that.courseLessons$ = that.activatedRoute.params
      .switchMap((params) => that.courseLessonsService.getCourseLessons(params['courseId']));

    that.activatedRoute.params
      .switchMap((params) => {
        that.courseId = params['courseId'];
        return that.authService.authInfo$;
      })
      .subscribe(
        authInfo => {
          that.authInfo = authInfo;
          if (that.authInfo && that.authInfo.getUser() && that.authInfo.getUser().courses) {
            const allSubscribedCourses = _.map(that.authInfo.getUser().courses, 'courseUrl');
            that.isCourseNotTaken = !allSubscribedCourses.includes(that.courseId);

            const currentCourse: UserCourse = _.find(that.authInfo.getUser().courses, function (obj) {
              return obj.courseUrl === that.courseId;
            });

            if (currentCourse && currentCourse.scores.length > 0) {
              console.log('currentCourse.scores.length' + currentCourse.scores.length);
              that.maxLessonIndexToOpen = currentCourse.scores.length;
              console.log('maxLessonIndexToOpen' + that.maxLessonIndexToOpen);
            }
          }
        }
      );
    ;
  }

  takeTheCourse(courseId) {
    localStorage.setItem('courseId', courseId);
  }

  subscribeTheCourse(courseId) {
    this.isCourseNotTaken = false;
    this.authService.updateRegisterCourseInformation(this.authInfo.getUser(), courseId);
  }

}
