import {Component, OnInit} from '@angular/core';
import {Route, ActivatedRoute} from '@angular/router';
import {CourselessonsService} from './courselessons.service';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';

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

  constructor(private activatedRoute: ActivatedRoute, private courseLessonsService: CourselessonsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.courseId = params['courseId'];
    });
    localStorage.setItem('courseId', this.courseId);
    this.courseLessonsService.getCourseLessons(this.courseId).subscribe(
      (data) => {
        for (const key in data ) {
          this.courseLessons.push(data[key]);
        }
      }
    );
    this.authService.authInfo$
      .subscribe(
        authInfo => {
          this.authInfo = authInfo
        }
      );
  }

  takeTheCourse(courseId) {
    console.log(courseId);
  }

}
