import { Component, OnInit } from '@angular/core';
import { WordService } from '../../shared/model/word.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
items: FirebaseListObservable<any[]>;
wordform: FormGroup;
chkflag: boolean=false;
  constructor(private wordService: WordService, public af: AngularFireDatabase) { }

  ngOnInit() {
  	 this.items = this.af.list('/course_words', {
      query: {
        limitToLast: 50,
        orderByKey: true
      }
    });
  	 this.initForm();
  	 console.log(this.items);
  }
  private initForm(){
    let word='';
    let meaning='';
    let pronunciation='';
    let image='';
    let ref='';
    let phonetics=new FormArray([]);
    this.wordform= new FormGroup({
      'word':new FormControl(word,Validators.required),
      'meaning':new FormControl(meaning,Validators.required),
      'pronunciation':new FormControl(pronunciation,Validators.required),
      'image':new FormControl(image,Validators.required),
       'ref':new FormControl(ref,Validators.required),
       'phonetics':phonetics
    });
  }
  onAddnew(){
    (<FormArray>this.wordform.get('phonetics')).push(
      new FormGroup({
        'breakword': new FormControl(null,Validators.required),
        'sample' : new FormControl(null,Validators.required)
      })
    );
  }
addnew(){
	this.chkflag=true;
}
 onDeleteold(index: number){
    (<FormArray>this.wordform.get('phonetics')).removeAt(index);  
  }
}
