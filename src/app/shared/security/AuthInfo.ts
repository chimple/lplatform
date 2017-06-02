import {UserInformation} from './user-info';

export class AuthInfo {
  private userInfo: UserInformation;

  constructor(private user: UserInformation) {
    this.user = user;
  }

  isLoggedIn() {
    return this.user && this.user.uid ? true : false;
  }

  getUser(): UserInformation {
    return this.user;
  }
}
