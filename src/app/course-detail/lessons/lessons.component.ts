import { Component, OnInit } from '@angular/core';
/*import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';*/
import { LessonService } from '../../shared/model/lesson.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [LessonService]
})
export class LessonsComponent implements OnInit {
	items: FirebaseListObservable<any[]>;
	insertFlag:boolean = false;
	constructor(db: AngularFireDatabase) {
		this.items = db.list('/course_lessons');
		console.log(this.items);
	}



  ngOnInit() {
  	//this.courseDetail$ = this.courseService.getCourseDetail(courseUrl);
  }

  addLesson(){
  	this.insertFlag = true;
  }

}
