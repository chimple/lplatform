import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-phonetics',
  templateUrl: './phonetics.component.html',
  styleUrls: ['./phonetics.component.css']
})
export class PhoneticsComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
  }

}
