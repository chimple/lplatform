import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/security/auth.service';
import {Router} from '@angular/router';
import {AuthInfo} from "../shared/security/AuthInfo";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  authInfo: AuthInfo;
  currentCourse:any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.authInfo$
      .subscribe(
        authInfo => {
          this.authInfo = authInfo
          if(this.authInfo.getUser()){
            this.currentCourse =  this.authInfo.getUser().currentCourse;
          }
        }
    );

  }


  loginUsingGoogle(provider: string) {
    this.authService.loginUsingProvider(provider)
      .subscribe(
        () => {
           this.router.navigate(['/home']);
        }
      );
  }

  login() {
    const formValue = this.form.value;
    this.authService.login(formValue.email, formValue.password)
      .subscribe(
        () => this.router.navigate(['/home']),
        alert
      );
  }
}
