export class CourseDetail {

  static fromJsonList(array): CourseDetail[] {
    return array.map(CourseDetail.fromJson);
  }

  static fromJson({$key, description}): CourseDetail {
    return new CourseDetail($key, description);
  }

  constructor(public $key: string, public description: string) {
  }
}
