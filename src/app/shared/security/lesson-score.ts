import * as _ from 'lodash';

export class LessonScore {
  static fromJson(lessonUrl, score): LessonScore {
    return new LessonScore(lessonUrl, score);
  }

  static fromJsonList(array): LessonScore[] {
    const result: LessonScore[] = [];
    _.each(_.keys(array), (key) => {
      result.push(LessonScore.fromJson(key, array[key]));
    });

    return result;
  }

  constructor(public lessonUrl: string, public score: number) {
  }
}
