import {Component, OnInit} from '@angular/core';
import {CoursesService} from '../shared/model/courses.service';
import {Observable} from 'rxjs/Observable';
import {CourseDetail} from '../shared/model/course-detail';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  courseDetail$: Observable<CourseDetail>;
  constructor(private courseService: CoursesService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    const courseUrl = this.router.snapshot.params['id'];
    this.courseDetail$ = this.courseService.getCourseDetail(courseUrl);
  }

}
