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

  constructor(private route: ActivatedRoute, private alphabetService: AlphabetService) {
  }

  ngOnInit() {
    const alphabet$Key: string = this.route.snapshot.params['alphabetId'];
    this.alphabets$ = this.alphabetService.findAlphabetsByCourse(alphabet$Key);
  }

}
