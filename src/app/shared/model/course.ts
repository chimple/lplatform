export class Course {

  static fromJsonList(array): Course[] {
    return array.map(Course.fromJson);
  }

  static fromJson({$key, creator, lang, learners, name, image}): Course {
    return new Course($key, creator, lang, learners, name, image);
  }

  constructor(public $key: string,
              public creator: string,
              public lang: string,
              public learners: number,
              public name: string,
              public image: string) {

  }
}
