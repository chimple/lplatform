export class Alphabet {
  static fromJsonList(array): Alphabet[] {
    return array.map(Alphabet.fromJson);
  }

  static fromJson({$key, character, sound, order, pronounciation}): Alphabet {
    return new Alphabet($key, character, sound, order, pronounciation);
  }

  constructor(public $key: string,
              public character: string,
              public sound: string,
              public order: number,
              public pronounciation: string) {

  }

}
