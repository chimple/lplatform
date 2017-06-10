import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {LessonService} from '../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Lesson} from '../../shared/model/lesson';
import {PhoneticService} from '../../shared/model/phonetic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [LessonService]
})

export class LessonsComponent implements OnInit {

  //showLesson = 1;
  tst: any = 'Sharath';
  teachSelect: any;
  insertFlag = false;
  editFlag: any;
  lessons$: Observable<Lesson[]>;
  phoneticsSelection$: Observable<string[]>;
  dragStartIndex = -1;
  dropIndex = -1;
  dragElement;
  course$Key: any;

  @ViewChild('lf') lessonsForm: NgForm;
  @ViewChild('lessonEdit') lessonsEditForm: NgForm;
  @ViewChild('tf') testForms: NgForm;

  constructor(private phoneticService: PhoneticService, private lessonService: LessonService, private route: ActivatedRoute, private router: Router, private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {

      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
      console.log(this.course$Key);
    });
  }



  ngOnInit() {
    this.course$Key = this.route.snapshot.params['lessonId'];  // XX01
    this.lessons$ = this.lessonService.findAllLessonByCourse(this.course$Key);
    this.phoneticsSelection$ = this.phoneticService.findPhoneticsPropertyByCourse(this.course$Key);
  }

  onDrag(args) {
    const [e] = args;
    if (e) {
      console.log(`drag:${e.rowIndex}`);
      this.dragStartIndex = e.rowIndex;
    }


    // do something
  }


  onDrop(args) {
    const [e] = args;
    if (e) {
      console.log(`drop ${e.rowIndex}`);
      this.dropIndex = e.rowIndex;
    }
  }

  callChildRoutes() {
  }

  addLesson(): void {
    this.insertFlag = true;
  }

  submitLesson() {
    console.log(`Submit Lesson: ${this.lessonsForm.value}`);
    this.lessonService.createLesson(this.course$Key, this.lessonsForm.value);
    this.insertFlag = false;
  }

  deleteLesson(lesson: string) {
    console.log(lesson);
    this.lessonService.deleteLesson(this.course$Key, lesson);
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

/* Testing */
