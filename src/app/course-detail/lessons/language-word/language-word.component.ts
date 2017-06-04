import {Component, OnInit, ViewChild} from '@angular/core';
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
  dropvalue= '';
  dragElement;

  constructor(public dragulaService: DragulaService, public lessonService: LessonService, private wordService: WordService, private route: ActivatedRoute, public router: Router) {
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
    console.log("Latest Course Key: "+ this.course$key);
    this.lesonWord$ = this.lessonService.getLessonItems(this.lessonWord$Key);
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
  /* -------------------------------------- */

  navigateToParent(){
    this.lessonService.courseKey=1;
    //this.router.navigate(['../../'], { relativeTo: this.route });
    //reload();
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

  addWord() {
    this.lwInsertFlag = true;
  }

  submitLW() {
    console.log(this.lwForm.value);
    let existingWordsForCourse = [];
    const that = this;
    const updatedForm = this.lwForm.value;
    this.wordService.findWordsByCourse('XX01')
      .subscribe(
        (words) => {
          existingWordsForCourse = words;
          const checkWordExists = existingWordsForCourse.map(word =>  word.word).includes(updatedForm.word);
          that.lessonService.createLessonItem('XX01', that.lessonWord$Key, updatedForm, 'word', checkWordExists);
        });
    this.lwInsertFlag = false;
  }

}
