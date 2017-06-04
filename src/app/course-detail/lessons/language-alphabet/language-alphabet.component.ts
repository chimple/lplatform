import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm} from '@angular/forms';
import {LessonService} from '../../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonItem} from '../../../shared/model/lesson-item';
import {AlphabetService} from "../../../shared/model/alphabet.service";
import {DragulaService} from 'ng2-dragula';

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
  dragStartIndex = -1;
  dropIndex = -1;
  dropvalue= '';
  dragElement;

  @ViewChild('la') laForm: NgForm;
  @ViewChild('laEdit') laEditForm: NgForm;

  constructor(public dragulaService: DragulaService, private lessonService: LessonService, private route: ActivatedRoute, private alphabetService: AlphabetService) {
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
      console.log(this.lessonAlpha$Key);
    });
  }

  navigateToParent(){
    //this.lessonService.courseKey=1;
    //this.router.navigate(['../../'], { relativeTo: this.route });
    //reload();
        window.document.getElementById("showLesson").style.display = "block";
  }

  ngOnInit() {
    this.lessonAlpha$Key = this.route.snapshot.params['lessonAlphaId'];
    //this.course$key = this.route.snapshot.params['lessonId'];
    this.lesonAlpha$ = this.lessonService.getLessonItems(this.lessonAlpha$Key);
    window.document.getElementById("showLesson").style.display = "none";
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
