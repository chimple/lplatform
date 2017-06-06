import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';
import {CourseService} from '../shared/model/course.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit {

  authInfo: AuthInfo;
  course$Key: string;
  editCourseMode: false;

  constructor(private authService: AuthService,
              private courseService: CourseService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const that = this;
    this.authService.authInfo$
      .subscribe(
        authInfo => {
          that.authInfo = authInfo;
        }
      );
    this.course$Key = this.route.snapshot.params['courseId'];
   }

  courseReg(registerForm: NgForm) {
    console.log(registerForm.value);
    if (this.authInfo && this.authInfo.getUser().email) {
      this.courseService.save(registerForm, this.authInfo.getUser().email).subscribe(
        () => {
          this.router.navigate(['home/course/mycourses']);
                },
        err => alert(`error in creating new Course ${err}`)
      );
    }

    registerForm.reset();
  }

}
