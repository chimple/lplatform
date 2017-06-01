import {LessonScore} from './lesson-score';
export class UserCourse {

  static fromJsonList(array): UserCourse[] {
    return array.map(UserCourse.fromJson);
  }

  static fromJson({courseUrl, lessonScores}): UserCourse {
    return new UserCourse(courseUrl, LessonScore.fromJsonList(lessonScores));
  }

  constructor(public courseUrl: string,
              public scores: LessonScore[]) {

  }
}
