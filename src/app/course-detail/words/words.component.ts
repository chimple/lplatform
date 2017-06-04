import {Component, OnInit} from '@angular/core';
import {WordService} from '../../shared/model/word.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Word} from '../../shared/model/word';
import {PhoneticService} from '../../shared/model/phonetic.service';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css'],
  animations: [
    trigger('AnimatedStyle', [

      state('in', style({ opacity: 1, transform: 'translateX(0)' })),

      transition('void => *', [
        animate(1000, keyframes([

          style({
            transform: 'translateX(-100px)', opacity: 0 , offset: 0
          }),
          style({
            transform: 'translateX(-50px)', opacity: 0.5 , offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)', opacity: 1, offset: 0.8
          }),
          style({
            transform: 'translateX(0px)', opacity: 1, offset: 1
          })
        ]))
      ]),

      transition('* => void', [
        group([
          animate(100, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)', opacity: 0
          }))])


      ])
    ])
  ]
})
export class WordsComponent implements OnInit {
  words$: Observable<Word[]>;
  phoneticsSelection$: Observable<string[]>;
  wordform: FormGroup;
  chkflag: boolean = false;
  editform: FormGroup;
  show = '';
  word$Key: string;
  newphonetic: string;

  constructor(private phoneticService: PhoneticService, private wordService: WordService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.word$Key = this.route.snapshot.params['wordId'];
    this.words$ = this.wordService.findWordsByCourse(this.word$Key);
    this.phoneticsSelection$ = this.phoneticService.findPhoneticsPropertyByCourse(this.word$Key);
    console.log(this.phoneticsSelection$);
    this.initForm();
  }

  private initForm() {
    const word = '';
    const meaning = '';
    const ref = '';
    const key = '';
    const image = '';
    const order = '';
    const pronunciation = '';
    const phonetics = new FormArray([]);
    const phoneticdata = new FormArray([]);
    this.wordform = new FormGroup({
      'word': new FormControl(word, Validators.required),
      'meaning': new FormControl(meaning, Validators.required),
      'ref': new FormControl(ref, Validators.required),
      'phonetics': phonetics,
      'pronunciation': new FormControl(pronunciation),
      'image': new FormControl(image)
    });
    this.editform = new FormGroup({
      'word': new FormControl(word, Validators.required),
      'meaning': new FormControl(meaning, Validators.required),
      'ref': new FormControl(ref, Validators.required),
      'phoneticdata': phoneticdata,
      'key': new FormControl(key, Validators.required),
      'pronunciation': new FormControl(pronunciation),
      'image': new FormControl(image),
      'order': new FormControl(order)
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

  showitem(value: any, index) {
    this.chkflag = false;
    if (this.show !== '' && index === this.show) {
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
    this.chkflag = false;
    this.wordform.reset();
  }

  onDelete(data) {
    console.log(data);
    if (confirm('Are you sure to delete ?')){
    this.wordService.deleteWord(this.word$Key, data);
  }
  }

  oneditData(editdata) {
    editdata.phonetics = editdata.phoneticdata;
    delete editdata.phoneticdata;
    console.log(editdata);
    this.wordService.createWord(this.word$Key, editdata);
    this.show = '';
  }

  editdata(alldata) {
    let word = '';
    let meaning = '';
    let ref = '';
    let key = '';
    let image = '';
    let order = '';
    let pronunciation = '';
    let phoneticdata = new FormArray([]);
    if (alldata) {
      word = alldata.word;
      key = alldata.word;
      meaning = alldata.meaning;
      ref = alldata.ref;
      image = alldata.image;
      order = alldata.order;
      pronunciation = alldata.pronunciation;
      for ( let ingredient of alldata.phonetics ) {
        phoneticdata.push(
          new FormGroup({
            'alphabet': new FormControl(ingredient.alphabet, Validators.required),
            'phonetic': new FormControl(ingredient.phonetics, Validators.required)
          })
        );
      }
    }
    this.editform = new FormGroup({
      'word': new FormControl(word, Validators.required),
      'meaning': new FormControl(meaning, Validators.required),
      'ref': new FormControl(ref, Validators.required),
      'key': new FormControl(key, Validators.required),
      'phoneticdata': phoneticdata,
      'pronunciation': new FormControl(pronunciation),
      'image': new FormControl(image),
      'order': new FormControl(order),
    });
  }

  onDeleteEdit(index: number) {
    (<FormArray>this.editform.get('phoneticdata')).removeAt(index);
  }

  onAddEdit() {
    (<FormArray>this.editform.get('phoneticdata')).push(
      new FormGroup({
        'alphabet': new FormControl(null, Validators.required),
        'phonetic': new FormControl(null, Validators.required)
      })
    );
  }
  private trackEntryItems(i, item): number {
    return item.id;
  }
}
