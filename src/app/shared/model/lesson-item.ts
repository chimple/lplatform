export class LessonItem {

  static fromJsonList(array): LessonItem[] {
    return array.map(LessonItem.fromJson);
  }

  static fromJson({$key, item, order}): LessonItem {
    return new LessonItem($key, item, order);
  }

  constructor(public $key: string,
              public item: string,
              public order: number) {

  }
}
