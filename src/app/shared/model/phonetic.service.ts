import {Injectable} from '@angular/core';
import {Phonetic} from './phonetic';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class PhoneticService {

  constructor(private db: AngularFireDatabase) {
  }

  findPhoneticsByCourse(courseUrl: string) {
    console.log(`findPhoneticsByCourse ${courseUrl}`);
    return this.db.list(`course_phonetics/${courseUrl}`, {
      query: {
        orderByChild: 'order'
      }
    }).map(results => Phonetic.fromJsonList(results));
  }

  findPhoneticsPropertyByCourse(courseUrl: string) {
    console.log(`findPhoneticsByCourse ${courseUrl}`);
    return this.db.list(`course_phonetics/${courseUrl}`, {
      query: {
        orderByChild: 'order'
      }
    }).map(results => Phonetic.fromJsonListFetchProperty(results, 'alphabet'));
  }

}
