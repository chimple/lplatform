import {Component, OnInit} from '@angular/core';
import {WordService} from '../../shared/model/word.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Word} from '../../shared/model/word';
@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  words$: Observable<Word[]>;
  wordform: FormGroup;
  chkflag: boolean = false;

  constructor(private wordService: WordService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const word$Key: string = this.route.snapshot.params['wordId'];
    this.words$ = this.wordService.findWordsByCourse(word$Key);
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
        'breakword': new FormControl(null, Validators.required),
        'sample': new FormControl(null, Validators.required)
      })
    );
  }

  addnew() {
    this.chkflag = true;
  }

  onDeleteold(index: number) {
    (<FormArray>this.wordform.get('phonetics')).removeAt(index);
  }
}
