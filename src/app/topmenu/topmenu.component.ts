import {Component, OnInit, ElementRef} from '@angular/core';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topmenu',
  host: {'(document:click)': 'handleClick($event)'},
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {

  authInfo: AuthInfo;
  public isCollapsedContent: boolean = false;
  public isCollapsedCourses: boolean = false;
  public elementRef;


  constructor(private authService: AuthService, private router: Router, private myElement: ElementRef) {
    this.elementRef = myElement;
  }

  ngOnInit() {
    this.authService.authInfo$
      .subscribe(
        authInfo => {
          this.authInfo = authInfo
          console.log(this.authInfo.getUser());
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
    if (this.isCollapsedCourses === false) {
      this.isCollapsedCourses = true;
      this.isCollapsedContent = false;
    } else if (this.isCollapsedCourses === true) {
      this.isCollapsedCourses = false;
    }
  }
}
