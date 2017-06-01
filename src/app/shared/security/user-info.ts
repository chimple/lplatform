import {UserCourse} from './user-course';
export class UserInformation {

  static fromJsonList(array): UserCourse[] {
    return array.map(UserCourse.fromJson);
  }

  static fromJson({email, displayName, photoURL, currentCourse, courseAfterLogin, userCourses}): UserInformation {
    return new UserInformation(email, displayName, photoURL, currentCourse, courseAfterLogin,
      UserCourse.fromJsonList(userCourses));
  }


  constructor(public email: string,
              public displayName: string,
              public photoURL: string,
              public currentCourse,
              public courseAfterLogin: string,
              public UserCourses: UserCourse[]) {

  }
}
