export class LessonScore {
  static fromJson({lessonUrl, score}): LessonScore {
    return new LessonScore(lessonUrl, score);
  }

  static fromJsonList(array): LessonScore[] {
    return array.map(LessonScore.fromJson);
  }

  constructor(public lessonUrl: string, score: number) {
  }
}
