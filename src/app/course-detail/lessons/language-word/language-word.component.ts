import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm} from '@angular/forms';
import {LessonService} from '../../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonItem} from '../../../shared/model/lesson-item';

@Component({
  selector: 'app-language-word',
  templateUrl: './language-word.component.html',
  styleUrls: ['./language-word.component.css'],
  providers: [LessonService]
})
export class LanguageWordComponent implements OnInit {

  lwInsertFlag: boolean = false;
  lwEditFlag: any;
  lessonWord$Key: string;
  lesonWord$: Observable<LessonItem[]>;

  @ViewChild('lw') lwForm: NgForm;
  @ViewChild('lwEdit') lwEditForm: NgForm;

  constructor(private lessonService: LessonService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.lessonWord$Key = this.route.snapshot.params['lessonWordId'];
    this.lesonWord$ = this.lessonService.getLessonItems(this.lessonWord$Key);
  }




  /* -------------------------------------- */

  editLessonWord(lwIndex) {
    this.lwEditFlag = lwIndex;
  }

  updateLessonWord() {
    console.log(`Update Lesson Word: ${this.lwEditForm.value}`);
    //this.lessonService.updateLessonWord(this.lessonWord$Key, this.lwEditForm.value);
    this.lwEditFlag = '';
  }

  addWord() {
    this.lwInsertFlag = true;
  }

  submitLW() {
    console.log(this.lwForm.value);
    // this.lessonService.createLessonWord(this.lessonWord$Key, this.lwForm.value);
    this.lwInsertFlag = false;
  }

}
