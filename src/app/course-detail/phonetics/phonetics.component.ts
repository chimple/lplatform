import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Phonetic} from '../../shared/model/phonetic';
import {PhoneticService} from '../../shared/model/phonetic.service';
import {NgForm} from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-phonetics',
  templateUrl: './phonetics.component.html',
  styleUrls: ['./phonetics.component.css']
})
export class PhoneticsComponent implements OnInit {
  phonetics$key: string;
  myPhonetics: boolean = false;
  phonetics$: Observable<Phonetic[]>;

  constructor(private route: ActivatedRoute, private phoneticService: PhoneticService) {
  }

  ngOnInit() {
    this.phonetics$key = this.route.snapshot.params['phoneticId'];
    this.phonetics$ = this.phoneticService.findPhoneticsByCourse(this.phonetics$key);
  }

  addNewPhone() {
    this.myPhonetics = true;
  }

  onUpload() {
    swal({
      title: 'Are you sure?',
      text: ' You wont be able to revert this! ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      // this.paperName = ' ';
      // this.questionsCheckedArr = [];
      // this.paperCreationArray = [];
      // this.catQuestions.forEach((eachCatQuestion) => {
      //   eachCatQuestion.checked = false;
      // });
      swal(
        'cleared!',
        'Your paper name is cleared.',
        'success'
      );
    });
  }

  save(form: NgForm) {
    console.log(form.value);
    this.phoneticService.createPhonetic(this.phonetics$key, form.value);
    form.reset();
  }

}
