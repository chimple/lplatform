export class LessonItem {

  static fromJsonList(array): LessonItem[] {
    return array.map(LessonItem.fromJson);
  }

  static fromJson({$key, lesson, course, item, order, words}): LessonItem {
    return new LessonItem($key, lesson, course, item, order, words);
  }

  constructor(public lessonItem: string,
              public lesson: string,
              public course: string,
              public item: string,
              public order: number,
              public words: string[]) {

  }
}
