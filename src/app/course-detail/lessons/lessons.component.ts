import {Component, OnInit} from '@angular/core';
import {LessonService} from '../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
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
  lessonform: FormGroup;
  lessons$: Observable<Lesson[]>;

  constructor(private lessonService: LessonService, private route: ActivatedRoute) {

  }


  ngOnInit() {
    const lessonName = '';
    const teachSelect = '';
    this.lessonform = new FormGroup({
      'lessonName': new FormControl(lessonName, Validators.required),
      'teachSelect': new FormControl(teachSelect, Validators.required)
    });

    const course$Key: string = this.route.snapshot.params['lessonId'];
    this.lessons$ = this.lessonService.findAllLessonByCourse(course$Key);
  }

  addLesson(): void {
    this.insertFlag = true;
  }

  submitLesson(value) {
    console.log(value);
  }

}
