import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../shared/model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesListComponent implements OnInit {

  @Input()
  courses: Course[];

  constructor() { }

  ngOnInit() {
  }

}
