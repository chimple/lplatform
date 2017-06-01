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
  course$key: string;
  lesonWord$: Observable<LessonItem[]>;
  path: Observable<UrlSegment[]>;
  courKey: string;
  @ViewChild('lw') lwForm: NgForm;
  @ViewChild('lwEdit') lwEditForm: NgForm;
  parts: string;

  constructor(private lessonService: LessonService, private wordService: WordService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.lessonWord$Key = this.route.snapshot.params['lessonWordId'];  // XX04
<<<<<<< HEAD
    //this.course$key = this.route.snapshot.params['lessonId'];
    //this.courid = this.route.snapshot.params['id'];
    //this.courKey = this.lessonService.getCourseKey();
    this.lesonWord$ = this.lessonService.getLessonItems(this.lessonWord$Key);
    console.log(this.lesonWord$);

=======
    this.course$key = this.route.snapshot.params['lessonId'];
    this.lesonWord$ = this.lessonService.getLessonItems(this.lessonWord$Key);
>>>>>>> refs/remotes/origin/master
  }


  /* -------------------------------------- */

  editLessonWord(lwIndex) {
    this.lwEditFlag = lwIndex;
  }

  updateLessonWord() {
    console.log(`Update Lesson Word: ${this.lwEditForm.value}`);
    // this.lessonService.updateLessonWord(this.lessonWord$Key, this.lwEditForm.value);
    // this.wordService.updateLessonWord(this.lessonWord$Key, this.lwForm.value);
    this.lwEditFlag = '';
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
