import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/model/course.service';
import {Course} from '../shared/model/course';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses$: Observable<Course[]>;
  allCourses: Course[];
  filtered: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    const receivedCourses = this.courseService.findAllCourses();
    this.courses$ = receivedCourses;
    receivedCourses
      .subscribe(
        courses => this.allCourses = this.filtered = courses
      );
  }

  search(search: string) {
    this.filtered = this.allCourses.filter(course => course.name.toLowerCase().includes(search.toLowerCase()));
  }
}
