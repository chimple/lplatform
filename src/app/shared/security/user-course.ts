import {LessonScore} from './lesson-score';
import * as _ from 'lodash';

export class UserCourse {

  static fromJsonList(array): UserCourse[] {
    return array && array.map(UserCourse.fromJson);
    // const result: UserCourse[] = [];
    // if (object) {
    //   _.each(_.keys(object), (key) => {
    //     result.push(UserCourse.fromJson(key, object[key]));
    //   });
    // }
    // return result;
  }

  static fromJson(obj): UserCourse {
    return new UserCourse(obj.courseUrl, LessonScore.fromJsonList(obj.scores));
  }

  constructor(public courseUrl: string,
              public scores: LessonScore[] = []) {

  }
}
