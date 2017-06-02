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

  showLesson=1;
  tst: any = 'Sharath';
  teachSelect: any;
  insertFlag = false;
  editFlag: any;
  lessons$: Observable<Lesson[]>;
  phoneticsSelection$: Observable<string[]>;
   dragStartIndex = -1;
  dropIndex = -1;
  dragElement;

  @ViewChild('lf') lessonsForm: NgForm;
  @ViewChild('lessonEdit') lessonsEditForm: NgForm;
  @ViewChild('tf') testForms: NgForm;

  constructor(private phoneticService: PhoneticService, public lessonService: LessonService, private route: ActivatedRoute, public router: Router, private dragulaService: DragulaService) {
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
 course$Key: any;
 
  ngOnInit() {
    this.course$Key = this.route.snapshot.params['lessonId'];  // XX01
    this.lessons$ = this.lessonService.findAllLessonByCourse(this.course$Key);
    this.phoneticsSelection$ = this.phoneticService.findPhoneticsPropertyByCourse(this.course$Key);
    console.log("Before: "+this.showLesson);
/*    if(this.lessonService.courseKey !== undefined || this.lessonService.courseKey !== 'undefined' ){
      this.showLesson = this.lessonService.courseKey;
      console.log("After: "+this.showLesson);
    }*/
    //this.lessonService.setCourseKey(this.course$Key);
  }

    onDrag(args) {
    let [e] = args;
    if (e) {
      console.log(`drag:${e.rowIndex}`);
      this.dragStartIndex = e.rowIndex;
    }


    // do something
  }


  onDrop(args) {
    let [e] = args;
    if (e) {
      console.log(`drop ${e.rowIndex}`);
      this.dropIndex = e.rowIndex;
    }


    // do something
  }

/*  callChildRoutes(languageWordAlpha, lessonWordAlphaKey){
    this.showLesson = false;
    if(languageWordAlpha === "language-word"){
      this.router.navigate([''+languageWordAlpha+'', lessonWordAlphaKey]);
      this.router.navigate(['../../viewcategory'], { relativeTo: this.route });
    }else if(languageWordAlpha === "language-alphabet"){
      this.router.navigate([''+languageWordAlpha+'', lessonWordAlphaKey]);
      this.router.navigate(['../../viewcategory'], { relativeTo: this.route });
    }
  }*/

  callChildRoutes(){
    this.showLesson = 2;
    this.lessonService.courseKey = this.showLesson;
  }

  addLesson(): void {
    this.insertFlag = true;
  }
  submitLesson() {
    console.log(`Submit Lesson: ${this.lessonsForm.value}`);
    this.lessonService.createLesson(this.course$Key, this.lessonsForm.value);
    this.insertFlag = false;
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


