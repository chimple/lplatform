import {UserInformation} from './user-info';

export class AuthInfo {
  private userInfo: UserInformation;

  constructor(private uid: string, private user: any) {
    console.log(`user ${user}`);
    if (user) {
      this.userInfo = new UserInformation(user.email,
        user.displayName, user.photoURL, null, null, []);
    }
  }

  isLoggedIn() {
    return !!this.uid;
  }

  getUser() {
    return this.user;
  }

  getUserInfo(): UserInformation {
    return this.userInfo;
  }
}
