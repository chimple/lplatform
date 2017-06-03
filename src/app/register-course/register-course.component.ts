import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit {

  authInfo: AuthInfo;
  constructor( private authService: AuthService) { }

  ngOnInit() {
    const that = this;
    this.authService.authInfo$
      .subscribe(
        authInfo => {
          that.authInfo = authInfo;
        }
      );
  }

  courseReg(registerForm: NgForm) {
    console.log(registerForm.value);
    registerForm.reset();
  }

}
