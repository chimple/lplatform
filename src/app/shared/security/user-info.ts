import {UserCourse} from './user-course';
export class UserInformation {

  static fromJsonList(array): UserCourse[] {
    return array.map(UserCourse.fromJson);
  }

  static fromJson({uid, email, displayName, photoURL, currentCourse, courseAfterLogin, courses}): UserInformation {
    return new UserInformation(uid, email, displayName, photoURL, currentCourse, courseAfterLogin,
      UserCourse.fromJsonList(courses));
  }


  constructor(public uid: string,
              public email: string,
              public displayName: string,
              public photoURL: string,
              public currentCourse: string = '',
              public courseAfterLogin: string = '',
              public courses: UserCourse[] = []) {

  }
}
