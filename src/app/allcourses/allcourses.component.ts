import { Component, OnInit } from '@angular/core';
import { AllcoursesService } from './allcourses.service';

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css'],
  providers:[AllcoursesService]
})
export class AllcoursesComponent implements OnInit {
totalCourses:any;
totalCoursesArray = [];
  constructor(private allCourses:AllcoursesService) { }

  ngOnInit() {
  	this.allCourses.getCourses().subscribe(
  		(data)=>{
  			this.totalCourses = data;
  			for(let key in data){
  				this.totalCoursesArray.push(data[key]);
  			}
  		}
  	);	
  }

}
