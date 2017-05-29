export class Word {

  static fromJsonList(array): Word[] {
    return array.map(Word.fromJson);
  }

  static fromJson({$key, image, meaning, phonetics, pronunciation, ref}): Word {
    return new Word($key,image, meaning, phonetics, pronunciation, ref);
  }

  constructor(public $key: string,
              public meaning: string,
              public pronunciation: string,
              public phonetics: any,
              public ref: string,
              public image: string) {

  }
}
