export class Course {

  static fromJsonList(array): Course[] {
    return array.map(Course.fromJson);
  }

  static fromJson({$key, creator, language, learners, name, imageUrl}): Course {
    return new Course($key, creator, language, learners, name, imageUrl);
  }

  constructor(public $key: string,
              public creator: string,
              public language: string,
              public learners: number,
              public name: string,
              public imageUrl: string) {

  }
}
