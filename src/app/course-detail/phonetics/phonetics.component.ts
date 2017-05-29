import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Phonetic} from '../../shared/model/phonetic';
import {PhoneticService} from '../../shared/model/phonetic.service';

@Component({
  selector: 'app-phonetics',
  templateUrl: './phonetics.component.html',
  styleUrls: ['./phonetics.component.css']
})
export class PhoneticsComponent implements OnInit {

  phonetics$: Observable<Phonetic[]>;

  constructor(private route: ActivatedRoute, private phoneticService: PhoneticService) {
  }

  ngOnInit() {
    const phonetics$key: string = this.route.snapshot.params['phoneticId'];
    this.phonetics$ = this.phoneticService.findPhoneticsByCourse(phonetics$key);
  }

}
