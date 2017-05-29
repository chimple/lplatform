import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Alphabet} from '../../shared/model/alphabet';
import {AlphabetService} from '../../shared/model/alphabet.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabets.component.html',
  styleUrls: ['./alphabets.component.css']
})
export class AlphabetComponent implements OnInit {

  alphabets$: Observable<Alphabet[]>;
  alphabet$Key: string;
  alphabets: Alphabet[];

  constructor(private route: ActivatedRoute, private alphabetService: AlphabetService) {
  }

  ngOnInit() {
    this.alphabet$Key = this.route.snapshot.params['alphabetId'];
    this.alphabets$ = this.alphabetService.loadFirstAlphabetsPage(this.alphabet$Key, 2);
    this.alphabets$.subscribe(
      alphabets => this.alphabets = alphabets
    );
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


}
