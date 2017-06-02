export class Lesson {

  static fromJsonList(array): Lesson[] {
    return array.map(Lesson.fromJson);
  }

  static fromJson({$key, name, order, teach,image}): Lesson {
    return new Lesson($key, name, order, teach,image);
  }

  constructor(public lesson: string,
              public name: string,
              public order: number,
              public teach: string,
              public image: string) {

  }


}
