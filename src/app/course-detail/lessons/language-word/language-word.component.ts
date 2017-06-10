import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm} from '@angular/forms';
import {LessonService} from '../../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router, Params, UrlSegment} from '@angular/router';
import {LessonItem} from '../../../shared/model/lesson-item';
import 'rxjs/Rx';
import {Word} from '../../../shared/model/word';
import {WordService} from '../../../shared/model/word.service';
import * as _ from 'lodash';
import {DragulaService} from 'ng2-dragula';
import {CourseService} from "../../../shared/model/course.service";


@Component({
  selector: 'app-language-word',
  templateUrl: './language-word.component.html',
  styleUrls: ['./language-word.component.css'],
  providers: [LessonService]
})
export class LanguageWordComponent implements OnInit {

  lwInsertFlag = false;
  lwEditFlag: any;
  lessonWord$Key: string;
  course$key: any;
  lesonWord$: Observable<LessonItem[]>;
  path: Observable<UrlSegment[]>;
  @ViewChild('lw') lwForm: NgForm;
  @ViewChild('lwEdit') lwEditForm: NgForm;
  parts: string;
  dragStartIndex = -1;
  dropIndex = -1;
  dropvalue = '';
  dragElement;
  lesonWord$Arr = [];
  existingWordsForCourse = [];

  constructor(public dragulaService: DragulaService, public lessonService: LessonService, private wordService: WordService,
              private route: ActivatedRoute, public router: Router, private courseService: CourseService) {
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
      console.log(this.lessonWord$Key);
    });
  }

  ngOnInit() {
    this.lessonWord$Key = this.route.snapshot.params['lessonWordId'];  // XX04
    console.log("Latest Course Key: " + this.course$key);
    this.lesonWord$ = this.lessonService.getLessonItems(this.lessonWord$Key);
    window.document.getElementById("showLesson").style.display = "none";

    this.wordService.findWordsByCourse(this.lessonWord$Key)
      .subscribe(
        (words) => {
          this.existingWordsForCourse = words;
        }
      );
  }

  /*  ngOnDestroy(){
   window.document.getElementById("showLesson").style.display = "block";
   }*/


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

  /* -------------------------------------- */

  navigateToParent() {
    //this.lessonService.courseKey=1;
    //this.router.navigate(['../../'], { relativeTo: this.route });
    //reload();
    window.document.getElementById("showLesson").style.display = "block";
  }

  editLessonWord(lwIndex) {
    this.lwEditFlag = lwIndex;
  }

  updateLessonWord() {
    console.log(`Update Lesson Word: ${this.lwEditForm.value}`);
    // this.lessonService.updateLessonWord(this.lessonWord$Key, this.lwEditForm.value);
    // this.wordService.updateLessonWord(this.lessonWord$Key, this.lwForm.value);
    /* ------------------------------------------ */

    /* ------------------------------------------ */
  }

  deleteWord(course$Key, lesson$key, lessonItem$key) {
    this.lessonService.deleteLessonWord(lesson$key, lessonItem$key);
  }

  addWord() {
    this.lwInsertFlag = true;
  }

  submitLW() {
    console.log(this.lwForm.value);
    const that = this;
    const updatedForm = this.lwForm.value;

    const checkWordExists = this.existingWordsForCourse.map(word => word.word).includes(updatedForm.word);
    this.lessonService.createLessonItem(this.lessonWord$Key, this.lessonWord$Key, updatedForm, 'word', checkWordExists);
    this.lwInsertFlag = false;
  }

}
