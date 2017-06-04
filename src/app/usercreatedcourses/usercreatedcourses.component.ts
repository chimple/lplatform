
import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/model/course.service';
import {Course} from '../shared/model/course';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';

@Component({
  selector: 'app-usercreatedcourses',
  templateUrl: './usercreatedcourses.component.html',
  styleUrls: ['./usercreatedcourses.component.css']
})
export class UsercreatedcoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  allCourses: Course[];
  filtered: Course[];
  authInfo: AuthInfo;

  constructor(private courseService: CourseService,private authService: AuthService) { }

  ngOnInit() {
  	const that = this;
    this.authService.authInfo$
      .subscribe(
        authInfo => {
          that.authInfo = authInfo;
        }
      );

    const receivedCourses = this.courseService.findAllCourses();
    this.courses$ = receivedCourses;
    receivedCourses
      .subscribe(
        courses => this.allCourses = this.filtered = courses
      );
  }

  search(search: string) {
    this.filtered = this.allCourses.filter(course => course.name.toLowerCase().includes(search.toLowerCase()));
  }
}

