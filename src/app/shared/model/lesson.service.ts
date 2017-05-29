
import { Injectable } from '@angular/core';
import{Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import{Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class LessonService {
	temp:any;
  constructor(private db: AngularFireDatabase) {

  }
}
