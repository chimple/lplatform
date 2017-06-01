export class AuthInfo {

  constructor(private uid: string, private user: any) {
    console.log(`user ${user}`);
  }

  isLoggedIn() {
    return !!this.uid;
  }

  getUser() {
    return this.user;
  }

  getUserInfo() {

  }
}
