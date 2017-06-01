import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm} from '@angular/forms';
import {LessonService} from '../../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonItem} from '../../../shared/model/lesson-item';
import {AlphabetService} from "../../../shared/model/alphabet.service";

@Component({
  selector: 'app-language-alphabet',
  templateUrl: './language-alphabet.component.html',
  styleUrls: ['./language-alphabet.component.css'],
  providers: [LessonService]
})
export class LanguageAlphabetComponent implements OnInit {

  laInsertFlag: boolean = false;
  laEditFlag: any;
  lessonAlpha$Key: string;
  lesonAlpha$: Observable<LessonItem[]>;
  course$key: string;

  @ViewChild('la') laForm: NgForm;
  @ViewChild('laEdit') laEditForm: NgForm;

  constructor(private lessonService: LessonService, private route: ActivatedRoute, private alphabetService: AlphabetService) {
  }

  ngOnInit() {
    this.lessonAlpha$Key = this.route.snapshot.params['lessonAlphaId'];
    this.course$key = this.route.snapshot.params['lessonId'];
    this.lesonAlpha$ = this.lessonService.getLessonItems(this.lessonAlpha$Key);
  }




  /* -------------------------------------- */

  editLessonAlpha(laIndex) {
    this.laEditFlag = laIndex;
  }

  updateLessonAlpha() {
    console.log(`Update Lesson Word: ${this.laEditForm.value}`);
    // this.lessonService.updateLessonAlpha(this.lessonAlpha$Key, this.laEditForm.value);
    this.laEditFlag = '';
  }

  addAlpha() {
    this.laInsertFlag = true;
  }

  submitLA() {
    console.log(this.laForm.value);
    // this.lessonService.createLessonAlpha(this.lessonAlpha$Key, this.laForm.value);

    let existingAlphabetsForCourse = [];
    const that = this;
    const updatedForm = this.laForm.value;
    updatedForm['alphabet'] = updatedForm.item;
    this.alphabetService.findAlphabetsByCourse('XX01')
      .subscribe(
        (alphabets) => {
          existingAlphabetsForCourse = alphabets;
          const checkAlphabetExists = existingAlphabetsForCourse.map(alphabet =>  alphabet.alphabet).includes(updatedForm.item);
          that.lessonService.createLessonItem('XX01', that.lessonAlpha$Key, updatedForm, 'alphabet', checkAlphabetExists);
        });
    this.laInsertFlag = false;
  }

}
