export class CourseDetail {

  static fromJsonList(array): CourseDetail[] {
    return array.map(CourseDetail.fromJson);
  }

  static fromJson({$key, alphabets, description, lessons, phonetics, words}): CourseDetail {
    return new CourseDetail($key, description, alphabets, lessons, phonetics, words);
  }

  constructor(public $key: string,
              public description: string,
              public alphabets: boolean,
              public lessons: boolean,
              public phonetics: boolean,
              public words: boolean) {
  }
}
