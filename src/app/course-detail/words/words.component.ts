import {Component, OnInit} from '@angular/core';
import {WordService} from '../../shared/model/word.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Word} from '../../shared/model/word';
import {PhoneticService} from '../../shared/model/phonetic.service';
@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  words$: Observable<Word[]>;
  phoneticsSelection$: Observable<string[]>;
  wordform: FormGroup;
  chkflag: boolean = false;
  phoneitem: any;
  show = '';
  word$Key: string;

  constructor(private phoneticService: PhoneticService, private wordService: WordService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.word$Key = this.route.snapshot.params['wordId'];
    this.words$ = this.wordService.findWordsByCourse(this.word$Key);
    this.phoneticsSelection$ = this.phoneticService.findPhoneticsPropertyByCourse(this.word$Key);
    console.log(this.words$);
    this.initForm();
  }

  private initForm() {
    const word = '';
    const meaning = '';
    const pronunciation = '';
    const image = '';
    const ref = '';
    const phonetics = new FormArray([]);
    this.wordform = new FormGroup({
      'word': new FormControl(word, Validators.required),
      'meaning': new FormControl(meaning, Validators.required),
      'pronunciation': new FormControl(pronunciation, Validators.required),
      'image': new FormControl(image, Validators.required),
      'ref': new FormControl(ref, Validators.required),
      'phonetics': phonetics
    });
  }

  onAddnew() {
    (<FormArray>this.wordform.get('phonetics')).push(
      new FormGroup({
        'alphabet': new FormControl(null, Validators.required),
        'phonetic': new FormControl(null, Validators.required)
      })
    );
  }

  addnew() {
    this.chkflag = true;
  }

  onDeleteold(index: number) {
    (<FormArray>this.wordform.get('phonetics')).removeAt(index);
  }

  showitem(index) {
    if (this.show !== '') {
      console.log(this.show);
      this.show = '';
    } else {
      this.show = index;

    }
  }

  onSubmitData(data) {
    console.log(data);
    this.wordService.createWord(this.word$Key, data);
  }
}
