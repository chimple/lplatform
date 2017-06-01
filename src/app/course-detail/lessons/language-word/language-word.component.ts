import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm} from '@angular/forms';
import {LessonService} from '../../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router, Params} from '@angular/router';
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

  @ViewChild('lw') lwForm: NgForm;
  @ViewChild('lwEdit') lwEditForm: NgForm;

  constructor(private lessonService: LessonService, private wordService: WordService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.lessonWord$Key = this.route.snapshot.params['lessonWordId'];  // XX04
    this.course$key = this.route.snapshot.params['lessonId'];
    /*this.course$key = this.route.snapshot.params.subscribe((params: Params) => {
     let paramsURL = params;
     console.log("Params URL: "+paramsURL);
     });*/
    this.lesonWord$ = this.lessonService.getLessonItems(this.lessonWord$Key);
    console.log(this.lesonWord$);
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
    this.wordService.findWordsByCourse('XX01')
      .subscribe(
        (words) => {
          existingWordsForCourse = words;
          const checkWordExists = existingWordsForCourse.map(word =>  word.word).includes(this.lwForm.value.word);
          this.lessonService.createLessonItem('XX01', this.lessonWord$Key, this.lwForm.value, checkWordExists);

        });
    this.lwInsertFlag = false;
  }

}
