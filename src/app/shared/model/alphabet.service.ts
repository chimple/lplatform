import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Alphabet} from './alphabet';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';

@Injectable()
export class AlphabetService {

  constructor(private db: AngularFireDatabase) {
  }

  findAlphabetsByCourse(courseUrl: string, query: FirebaseListFactoryOpts = {query: {orderByChild: 'order'}}): Observable<Alphabet[]> {
    console.log(`findAlphabetsByCourse ${courseUrl}`);
    return this.db.list(`course_alphabets/${courseUrl}`, query)
      .map(results => Alphabet.fromJsonList(results));
  }

  loadFirstAlphabetsPage(courseUrl: string, pageSize: number): Observable<Alphabet[]> {
    return this.findAlphabetsByCourse(courseUrl, {
      query: {
        limitToFirst: pageSize,
        orderByChild: 'order'
      }
    });
  }


  loadNextPage(courseUrl: string, lastAlphabetKey: string, pageSize: number): Observable<Alphabet[]> {

    return this.findAlphabetsByCourse(courseUrl, {
      query: {
        startAt: lastAlphabetKey,
        limitToFirst: pageSize + 1,
        orderByChild: 'order'
      }
    }).map(alphabets => alphabets.slice(1, alphabets.length));
  }

  loadPreviousPage(courseUrl: string, lastAlphabetKey: string, pageSize: number): Observable<Alphabet[]> {
    return this.findAlphabetsByCourse(courseUrl, {
      query: {
        endAt: lastAlphabetKey,
        limitToLast: pageSize + 1,
        orderByChild: 'order'
      }
    }).map(alphabets => alphabets.slice(0, alphabets.length - 1));
  }
}
