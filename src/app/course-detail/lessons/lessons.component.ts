import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [LessonService]
})
export class LessonsComponent implements OnInit {
	insertFlag:boolean = false;
	lessonform : FormGroup;	
	constructor(){

	}



	ngOnInit() {
		let lessonName='';
   		let teachSelect='';
		this.lessonform= new FormGroup({
			'lessonName':new FormControl(lessonName,Validators.required),
			'teachSelect':new FormControl(teachSelect,Validators.required)
		});
	}

	addLesson():void {
		this.insertFlag = true;
	}
	submitLesson(value){
		console.log(value);
	}

}
