import * as _ from 'lodash';
import {WordPhonetic} from './word-phonetic';

export class Word {

  static fromJsonList(array): Word[] {
    return array.map(Word.fromJson);
  }

  static fromJson({$key, image, meaning, phonetics, pronunciation, ref}): Word {
    phonetics = _.without(phonetics, undefined);
    return new Word($key, image, meaning, WordPhonetic.fromJsonList(phonetics), pronunciation, ref);
  }

  constructor(public word: string,
              public image: string,
              public meaning: string,
              public phonetics: Object[],
              public pronunciation: string,
              public ref: string) {

  }
}
