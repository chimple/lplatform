import {Component, OnInit, ViewChild} from '@angular/core';
import {LessonService} from '../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Lesson} from '../../shared/model/lesson';
import {PhoneticService} from '../../shared/model/phonetic.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [LessonService]
})

export class LessonsComponent implements OnInit {

  tst: any = 'Sharath';
  teachSelect: any;
  insertFlag = false;
  editFlag: any;
  lessons$: Observable<Lesson[]>;
  course$Key: string;
  phoneticsSelection$: Observable<string[]>;

  @ViewChild('lf') lessonsForm: NgForm;
  @ViewChild('lessonEdit') lessonsEditForm: NgForm;
  @ViewChild('tf') testForms: NgForm;

  constructor(private phoneticService: PhoneticService, private lessonService: LessonService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.course$Key = this.route.snapshot.params['lessonId'];  // XX01
    this.lessons$ = this.lessonService.findAllLessonByCourse(this.course$Key);
    this.phoneticsSelection$ = this.phoneticService.findPhoneticsPropertyByCourse(this.course$Key);
  }

  addLesson(): void {
    this.insertFlag = true;
  }
  submitLesson() {
    console.log(`Submit Lesson: ${this.lessonsForm.value}`);
    this.lessonService.createLesson(this.course$Key, this.lessonsForm.value);

  }

  teachDropDownChanged(param) {
    this.teachSelect = param;
  }

  /* -------------------------------------------------- */

  editLesson(lIndex) {
    this.editFlag = lIndex;

  }
  updateLesson() {
    console.log(`Update Lesson: ${this.lessonsEditForm.value}`);
    this.lessonService.createLesson(this.course$Key, this.lessonsEditForm.value);  //  (XX01, form values)
    this.editFlag = '';
  }


}


