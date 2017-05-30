import * as _ from 'lodash';

export class WordPhonetic {

  static fromJsonList(array): WordPhonetic[] {
    return array.map(WordPhonetic.fromJson);
  }

  static fromJson(phoneticInput): WordPhonetic {
    console.log(`phonetic ${phoneticInput}`);
    const phoneticWithoutOrder = _.omit(phoneticInput, ['order']);
    let alphabet = '';
    let phonetic = '';
    _.forOwn(phoneticWithoutOrder, (key, value) => {
      alphabet = value;
      phonetic = key;
    });
    return new WordPhonetic(alphabet, phonetic, phoneticInput['order']);
  }

  constructor(public alphabet: string,
              public phonetics: string,
              public order: number) {

  }
}
