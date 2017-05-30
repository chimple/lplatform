import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/AuthInfo';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {

  authInfo: AuthInfo;
  public isCollapsedContent:boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.authInfo$
      .subscribe(
        authInfo => {
          this.authInfo = authInfo
          console.log(this.authInfo.getUser())
        }
      );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  showUserInfo(){
    if(this.isCollapsedContent == false){
      this.isCollapsedContent = true;
    }else if(this.isCollapsedContent == true){
      this.isCollapsedContent = false;
    }
  }
}
