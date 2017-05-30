import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, NgForm} from '@angular/forms';
import {LessonService} from '../../../shared/model/lesson.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-language-word',
  templateUrl: './language-word.component.html',
  styleUrls: ['./language-word.component.css'],
  providers: [LessonService]
})
export class LanguageWordComponent implements OnInit {

	lwInsertFlag:boolean = false;
	lwEditFlag:any;

	@ViewChild('lw') lwForm: NgForm;

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
  }

  editAlphabet(lwIndex){
  	this.lwEditFlag = lwIndex;
  }


  /* -------------------------------------- */

  addAlphabet(){

  	this.lwInsertFlag = true;
  }

  submitLW(){
  	console.log(this.lwForm.value);
  }


}
