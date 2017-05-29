import * as _ from 'lodash';

export class Phonetic {
  static fromJsonList(array): Phonetic[] {
    console.log(JSON.stringify(array));
    return array.map(Phonetic.fromJson);
  }

  static fromJsonListFetchProperty(array, propertyName): any {
    console.log(JSON.stringify(array));
    const obj = array.map(Phonetic.fromJson);
    console.log(JSON.stringify(obj));
    console.log(JSON.stringify(_.map(obj, 'alphabet')));
    return _.map(obj, propertyName);
  }

  static fromJson({$key, course, order, pronunciation, writing}): Phonetic {
    return new Phonetic ($key, course, order, pronunciation, writing);
  }

  constructor(public alphabet: string,
              public course: string,
              public order: number,
              public pronunciation: string,
              public writing: string) {
  }
}
