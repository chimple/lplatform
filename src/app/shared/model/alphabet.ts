import * as _ from 'lodash';

export class Alphabet {
  static fromJsonList(array): Alphabet[] {
    console.log(JSON.stringify(array));
    return array.map(Alphabet.fromJson);
  }

  static fromJson({$key, course, order, pronunciation, sound}): Alphabet {
    return new Alphabet ($key, course, order, pronunciation, sound);
  }

  constructor(public alphabet: string,
              public course: string,
              public order: number,
              public pronunciation: string,
              public sound: string) {
  }
}
