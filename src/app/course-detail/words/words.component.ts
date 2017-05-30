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
  editform: FormGroup;
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
    let word = '';
    let meaning = '';
    let ref = '';
    let phonetics = new FormArray([]);
    this.wordform = new FormGroup({
      'word': new FormControl(word, Validators.required),
      'meaning': new FormControl(meaning, Validators.required),
      'ref': new FormControl(ref, Validators.required),
      'phonetics': phonetics
    });
    this.editform = new FormGroup({
      'word': new FormControl(word, Validators.required),
      'meaning': new FormControl(meaning, Validators.required),
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
    this.show = '';
  }

  onDeleteold(index: number) {
    (<FormArray>this.wordform.get('phonetics')).removeAt(index);
  }

  showitem(value:any,index) {
    this.chkflag = false;
    if (this.show !== '' && index===this.show) {
      console.log(this.show);
      this.show = '';
    } else {
      this.show = index;
      this.editdata(value);
    }
  }

  onSubmitData(data) {
    console.log(data);
    this.wordService.createWord(this.word$Key, data);
    this.wordform.reset();
  }
  oneditData(editdata){
    console.log(editdata);
   this.wordService.createWord(this.word$Key, editdata);
    this.show = '';
  }
  editdata(alldata){
    let word = '';
    let meaning = '';
    let ref = '';
    let phonetics = new FormArray([]);
    if(alldata){
      word=alldata.word;
      meaning=alldata.meaning;
      ref=alldata.ref;
      for(let ingredient of alldata.phonetics){
          phonetics.push(
            new FormGroup({
              'alphabet': new FormControl(ingredient.alphabet,Validators.required),
              'phonetic' : new FormControl(ingredient.phonetics,Validators.required)
            })
            );
        }
      }
    this.editform = new FormGroup({
      'word': new FormControl(word, Validators.required),
      'meaning': new FormControl(meaning, Validators.required),
      'ref': new FormControl(ref, Validators.required),
      'phonetics': phonetics
    });
}
onDeleteEdit(index: number){
  (<FormArray>this.editform.get('phonetics')).removeAt(index);
}
onAddEdit(){
   (<FormArray>this.editform.get('phonetics')).push(
      new FormGroup({
        'alphabet': new FormControl(null, Validators.required),
        'phonetic': new FormControl(null, Validators.required)
      })
    );
}
}