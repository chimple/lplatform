export class Phonetic {
  static fromJsonList(array): Phonetic[] {
    console.log(JSON.stringify(array));
    return array.map(Phonetic.fromJson);
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
