import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Word} from './word';
import {PhoneticService} from './phonetic.service';

@Injectable()
export class WordService {

  constructor(private db: AngularFireDatabase, private phoneticService: PhoneticService) {

  }

  findAllPhoneticsInCourse(courseUrl: string): any {
    return this.phoneticService.findPhoneticsPropertyByCourse(courseUrl);
  }

  findWordsByCourse(courseUrl: string): Observable<Word[]> {
    return this.db.list(`course_words/${courseUrl}`, {
      query: {
        orderByChild: 'ref'
      }
    }).map(results => Word.fromJsonList(results));
  }
}

