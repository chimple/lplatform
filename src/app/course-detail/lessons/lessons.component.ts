import {Component, OnInit, ViewChild} from '@angular/core';
import {LessonService} from '../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm } from '@angular/forms';
import {Observable} from "rxjs/Observable";
import {Lesson} from "../../shared/model/lesson";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [LessonService]
})

export class LessonsComponent implements OnInit {

  insertFlag: boolean = false;
  editFlag:any;
  //defaultTeach = "alphabets";
  lessons$: Observable<Lesson[]>;

  @ViewChild('lf') lessonsForm:NgForm;
  @ViewChild('lessonEdit') lessonsEditForm:NgForm;
  constructor(private lessonService: LessonService, private route: ActivatedRoute) { }


  ngOnInit() {
    const course$Key: string = this.route.snapshot.params['lessonId'];
    this.lessons$ = this.lessonService.findAllLessonByCourse(course$Key);
  }

  addLesson(): void {
    this.insertFlag = true;
  }

  submitLesson() {
    console.log(this.lessonsForm.value);
  }

  editLesson(lIndex){
    this.editFlag = lIndex;

  }
  updateLesson(){
    //console.log("lessonKey: "+ lessonKey);
    console.log("Update Lesson: "+this.lessonsEditForm.value);
    this.editFlag ="";
  }

}


