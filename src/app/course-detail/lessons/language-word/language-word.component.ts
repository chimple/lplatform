import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm} from '@angular/forms';
import {LessonService} from '../../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {LessonItem} from '../../../shared/model/lesson-item';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-language-word',
  templateUrl: './language-word.component.html',
  styleUrls: ['./language-word.component.css'],
  providers: [LessonService]
})
export class LanguageWordComponent implements OnInit {

  lwInsertFlag: boolean = false;
  lwEditFlag: any;
  lessonWord$: Observable<LessonItem[]>;
  course$Key: string;

  @ViewChild('lw') lwForm: NgForm;

  constructor(private lessonService: LessonService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.course$Key = this.route.snapshot.params['lessonId'];
    this.lessonWord$ = this.lessonService.getLessonItems(this.course$Key);
  }

  editAlphabet(lwIndex) {
    this.lwEditFlag = lwIndex;
  }


  /* -------------------------------------- */

  addAlphabet() {

    this.lwInsertFlag = true;
  }

  submitLW() {
    console.log(this.lwForm.value);
  }


}
