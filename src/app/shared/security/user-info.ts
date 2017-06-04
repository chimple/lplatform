import {UserCourse} from './user-course';
export class UserInformation {

  static fromJsonList(array): UserCourse[] {
    return array.map(UserCourse.fromJson);
  }

  static fromJson({uid, email, displayName, photoURL, currentCourse,currentCourseImage, courses}): UserInformation {
    return new UserInformation(uid, email, displayName, photoURL, currentCourse, UserCourse.fromJsonList(courses),currentCourseImage);
  }


  constructor(public uid: string,
              public email: string,
              public displayName: string,
              public photoURL: string,
              public currentCourse: string = '',
              public courses: UserCourse[] = [],
              public currentCourseImage: string = '') {

  }
}
