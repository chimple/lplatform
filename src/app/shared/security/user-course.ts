import {LessonScore} from './lesson-score';
import * as _ from 'lodash';

export class UserCourse {

  static fromJsonList(object): UserCourse[] {
    // return array && array.map(UserCourse.fromJson);
    const result: UserCourse[] = [];
    if (object) {
      _.each(_.keys(object), (key) => {
        result.push(UserCourse.fromJson(key, object[key]));
      });
    }
    return result;
  }

  static fromJson(courseUrl, lessonScores): UserCourse {
    return new UserCourse(courseUrl, LessonScore.fromJsonList(lessonScores));
  }

  constructor(public courseUrl: string,
              public scores: LessonScore[]) {

  }
}
