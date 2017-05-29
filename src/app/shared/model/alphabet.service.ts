import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Alphabet} from './alphabet';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class AlphabetService {

  constructor(private db: AngularFireDatabase) {
  }

  findAlphabetsByCourse(courseUrl: string): Observable<Alphabet[]> {
    console.log(`findAlphabetsByCourse ${courseUrl}`);
    return this.db.list(`course_alphabets`, {
      query: {
        orderByChild: 'course',
        equalTo: `${courseUrl}`
      }
    }).map(results => Alphabet.fromJsonList(results));
    // $results.subscribe(console.log);
  }
}
