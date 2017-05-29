import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Alphabet} from "../shared/model/alphabet";
import {AlphabetService} from "../shared/model/alphabet.service";

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent implements OnInit {

  alphabets$: Observable<Alphabet>;

  constructor(private alphabetService: AlphabetService) {
  }

  ngOnInit() {
    // this.alphabets$ = this.findAlphabetsByCourse();
  }


}
