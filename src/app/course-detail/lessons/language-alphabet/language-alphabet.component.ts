import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm, FormArray} from '@angular/forms';
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

  show = '';
  chkflag: boolean = false;
  lessonAlphaform: FormGroup;
  editform: FormGroup;

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
    this.initForm();
  }

    private initForm() {
    const alpha = '';
    const words = new FormArray([]);
    this.lessonAlphaform = new FormGroup({
      'alpha': new FormControl(alpha, Validators.required),
      'words': words,
    });
    this.editform = new FormGroup({
      'alpha': new FormControl(alpha, Validators.required),
      'words': words
    });

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

  onDelete(data) {
    console.log(data);
    if (confirm('Are you sure to delete ?')){
      //this.LessonService.deleteLessonAlpha(this.word$Key, data);
    }
  }

  /* -------------------------------------- */

  onAddnew() {
    (<FormArray>this.lessonAlphaform.get('words')).push(
      new FormGroup({
        'word': new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteold(index: number) {
    (<FormArray>this.lessonAlphaform.get('words')).removeAt(index);
  }

  editLessonAlpha(value: any, laIndex) {
    console.log(value);
    this.laEditFlag = laIndex;
    this.laInsertFlag = false;
    /*if (this.laEditFlag !== '' && laIndex === this.laEditFlag) {
      console.log(this.laEditFlag);
      this.laEditFlag = '';
    } else {
      this.laEditFlag = laIndex;
      this.editdata(value);
    }*/
    this.editdata(value);
  }

  editdata(alldata) {
    let alpha = '';
    let words = new FormArray([]);
    if (alldata) {
      alpha = alldata.item;
      for ( let ingredient of alldata.words ) {
        words.push(
          new FormGroup({
            'word': new FormControl(ingredient, Validators.required),
          })
        );
      }
    }
    this.editform = new FormGroup({
      'alpha': new FormControl(alpha, Validators.required),
      'words': words
    });
  }

  updateLessonAlpha(editdata) {
    editdata.phonetics = editdata.phoneticdata;
    delete editdata.phoneticdata;
    console.log(editdata);
   // this.wordService.createWord(this.word$Key, editdata);
    this.show = '';
    // this.lessonService.updateLessonAlpha(this.lessonAlpha$Key, this.laEditForm.value);
    this.laEditFlag = '';
  }

  onDeleteEdit(index: number) {
    (<FormArray>this.editform.get('words')).removeAt(index);
  }

  onAddEdit() {
    (<FormArray>this.editform.get('words')).push(
      new FormGroup({
        'word': new FormControl(null, Validators.required),
      })
    );
  }




  /* -------------------------- Add new Alphabet block ------------------------------- */

  addAlpha() {
    this.laInsertFlag = true;
  }

  submitLA(data) {
    console.log(data);
    // this.lessonService.createLessonAlpha(this.lessonAlpha$Key, this.laForm.value);

    let existingAlphabetsForCourse = [];
    const that = this;
    //const updatedForm = this.laForm.value;
    const updatedForm = data;
    updatedForm['alphabet'] = updatedForm.item;
    this.alphabetService.findAlphabetsByCourse('XX01')
      .subscribe(
        (alphabets) => {
          existingAlphabetsForCourse = alphabets;
          const checkAlphabetExists = existingAlphabetsForCourse.map(alphabet =>  alphabet.alphabet).includes(updatedForm.item);
          that.lessonService.createLessonItem('XX01', that.lessonAlpha$Key, updatedForm, 'alphabet', checkAlphabetExists);
        });
    this.laInsertFlag = false;
    this.lessonAlphaform.reset();
  }

}
