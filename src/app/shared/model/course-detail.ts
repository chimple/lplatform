export class CourseDetail {

  static fromJsonList(array): CourseDetail[] {
    return array.map(CourseDetail.fromJson);
  }

  static fromJson({$key, description, alphabets, phonetics, words, lessons}): CourseDetail {
    return new CourseDetail($key, description, alphabets, phonetics, words, lessons);
  }

  constructor(public $key: string, public description: string, public alphabets: number, public phonetics: number, public words: number, public lessons: number) {
  }
}
