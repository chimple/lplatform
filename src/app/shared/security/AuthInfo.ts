export class AuthInfo {

  constructor(private uid: string,private user:any) {
  }

  isLoggedIn() {
    return !!this.uid;
  }
  getUser(){
  	return this.user;
  }
}
