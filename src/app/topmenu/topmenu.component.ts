import {Component, OnInit, ElementRef} from '@angular/core';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';
import {Router} from '@angular/router';
import {CourseService} from "../shared/model/course.service";
import * as _ from 'lodash';
import {Observable} from "rxjs/Observable";
import {Course} from "../shared/model/course";

@Component({
  selector: 'app-topmenu',
  host: {'(document:click)': 'handleClick($event)'},
  templateUrl: './topmenu1.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {

  authInfo: AuthInfo;
  public isCollapsedContent: boolean = false;
  public isCollapsedCourses: boolean = false;
  public elementRef;
  subscribedCourses$: Observable<Course[]>;
  currentCourse$: Observable<Course>;

  constructor(private authService: AuthService, private router: Router, private myElement: ElementRef, private courseService: CourseService) {
    this.elementRef = myElement;
  }

  ngOnInit() {
    const that = this;
    this.authService.authInfo$
      .subscribe(
        authInfo => {
          that.authInfo = authInfo;
        }
      );
  }

  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.isCollapsedContent = false;
      this.isCollapsedCourses = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  showUserInfo() {
    if (this.isCollapsedContent === false) {
      this.isCollapsedContent = true;
      this.isCollapsedCourses = false;
    } else if (this.isCollapsedContent === true) {
      this.isCollapsedContent = false;
    }
  }

  showUserCourses() {
    if (this.authInfo && this.authInfo.getUser() && this.authInfo.getUser().currentCourse) {
      this.currentCourse$ = this.courseService.getCourseInformation(this.authInfo.getUser().currentCourse);
    }


    const allSubscribedCourses = _.map(this.authInfo.getUser().courses, 'courseUrl');
    this.subscribedCourses$ = this.courseService.findAllCourses()
      .do(console.log)
      .map((courses) => {
        return courses.filter((course) => allSubscribedCourses.includes(course.$key));
      })
    ;

    if (this.isCollapsedCourses === false) {
      this.isCollapsedCourses = true;
      this.isCollapsedContent = false;
    } else if (this.isCollapsedCourses === true) {
      this.isCollapsedCourses = false;
    }
  }
}
