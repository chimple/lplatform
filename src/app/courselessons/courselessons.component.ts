import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { CourselessonsService } from './courselessons.service';

@Component({
  selector: 'app-courselessons',
  templateUrl: './courselessons.component.html',
  styleUrls: ['./courselessons.component.css'],
  providers:[CourselessonsService]
})
export class CourselessonsComponent implements OnInit {
  language:any;
  courseId:any;
  courseLessons = [];
  constructor(private activatedRoute:ActivatedRoute,private courseLessonsService:CourselessonsService) { }

  ngOnInit() {
  	this.activatedRoute.params.subscribe((params) => {
        this.language = params['language'];
        this.courseId = params['courseId'];
    });
  	this.courseLessonsService.getCourseLessons(this.courseId).subscribe(
  		(data)=>{
  			for(let key in data){
  				this.courseLessons.push(data[key]);
  			}
  		}
  	);
  }

}
