// import { Component, OnInit } from '@angular/core';
// import { AllcoursesService } from './allcourses.service';
// import {Course} from '../shared/model/course';

// @Component({
//   selector: 'app-allcourses',
//   templateUrl: './allcourses.component.html',
//   styleUrls: ['./allcourses.component.css'],
//   providers:[AllcoursesService]
// })
// export class AllcoursesComponent implements OnInit {
// totalCourses:any;
// totalCoursesArray = [];
// //allCourses: Course[];
// filtered: Course[];
//   constructor(private allCourses:AllcoursesService) { }

//   ngOnInit() {
//   	this.allCourses.getCourses().subscribe(
//   		(data)=>{
//   			this.totalCourses = data;
//   			for(let key in data){
//   				this.totalCoursesArray.push(data[key]);
//   			}
//   		}
//   	);	
//   }
//   search(search: string) {
//     this.filtered = this.totalCourses.filter(course => course.name.toLowerCase().includes(search.toLowerCase()));
//   }

// }


import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/model/course.service';
import {Course} from '../shared/model/course';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css']
})
export class AllcoursesComponent implements OnInit {

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
