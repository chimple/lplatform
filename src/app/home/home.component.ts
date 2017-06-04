import {Component, OnInit} from '@angular/core';
import {CourseService} from '../shared/model/course.service';
import {Course} from '../shared/model/course';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses$: Observable<Course[]>;
  allCourses: Course[];
  filtered: Course[];
  authInfo: AuthInfo;
  currentCourse: any;

  constructor(private courseService: CourseService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    const receivedCourses = this.courseService.findAllCourses();
    this.courses$ = receivedCourses;
    receivedCourses
      .subscribe(
        courses => this.allCourses = this.filtered = courses
      );

    this.authService.authInfo$
      .subscribe(
        authInfo => {
          this.authInfo = authInfo;
          if (this.authInfo.getUser()) {
            this.currentCourse = this.authInfo.getUser().currentCourse;
          }
        }
      );
      
    var goToHomePage = localStorage.getItem('goToHomePage');
    if(goToHomePage){
      this.router.navigate(['/home']);
      localStorage.removeItem('goToHomePage');
    }else if (this.currentCourse) {
      this.router.navigate(['/home/lesson/' + this.currentCourse]);
    } else {
      this.router.navigate(['/home']);
    }
  }

  search(search: string) {
    this.filtered = this.allCourses.filter(course => course.name.toLowerCase().includes(search.toLowerCase()));
    console.log(this.filtered);
  }
}
