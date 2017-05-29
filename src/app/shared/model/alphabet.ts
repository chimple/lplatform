export class Alphabet {
  static fromJsonList(array): Alphabet[] {
    return array.map(Alphabet.fromJson);
  }

  static fromJson({$key, sound, order, pronunciation}): Alphabet {
    return new Alphabet($key, sound, order, pronunciation);
  }

  constructor(public $key: string,
              public sound: string,
              public order: number,
              public pronunciation: string) {

  }

}
