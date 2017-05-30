import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Alphabet} from '../../shared/model/alphabet';
import {AlphabetService} from '../../shared/model/alphabet.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabets.component.html',
  styleUrls: ['./alphabets.component.css']
})
export class AlphabetComponent implements OnInit {

  alphabets$: Observable<Alphabet[]>;
  alphabet$Key: string;
  alphabets: Alphabet[];
  myAlphabet: boolean = false;
  editAlpha: any;

  constructor(private route: ActivatedRoute, private alphabetService: AlphabetService) {
  }

  ngOnInit() {
    this.alphabet$Key = this.route.snapshot.params['alphabetId'];
    this.alphabets$ = this.alphabetService.findAlphabetsByCourse(this.alphabet$Key);
    this.alphabets$.subscribe(
      alphabets => this.alphabets = alphabets
    );
  }

  editAlph(i) {
    this.editAlpha = i;
  }

  addNewAlpha() {
    this.myAlphabet = true;
  }

  next() {
    this.alphabetService.loadNextPage(
      this.alphabet$Key,
      this.alphabets[this.alphabets.length - 1].alphabet,
      1
    ).subscribe(
      alphabets => this.alphabets = alphabets
    );
  }

  previous() {
    this.alphabetService.loadPreviousPage(
      this.alphabet$Key,
      this.alphabets[0].alphabet,
      1
    ).subscribe(
      alphabets => this.alphabets = alphabets
    );

  }


  save(form: NgForm) {
    console.log(JSON.stringify(form.value));
    this.alphabetService.createAlphabet(this.alphabet$Key, form.value)
      .subscribe(
        () => {
          alert('success in alphabet creation');
        },
        err => alert(`error in creating new alphabet ${err}`)
      );
  }

}
