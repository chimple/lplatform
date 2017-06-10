import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Phonetic} from '../../shared/model/phonetic';
import {PhoneticService} from '../../shared/model/phonetic.service';
import {NgForm} from '@angular/forms';
import {DragulaService} from 'ng2-dragula';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';
declare var swal: any;


@Component({
  selector: 'app-phonetics',
  templateUrl: './phonetics.component.html',
  styleUrls: ['./phonetics.component.css'],
  animations: [
    trigger('AnimatedStyle', [

      state('in', style({opacity: 1, transform: 'translateX(0)'})),

      transition('void => *', [
        animate(1000, keyframes([

          style({
            transform: 'translateX(-100px)', opacity: 0, offset: 0
          }),
          style({
            transform: 'translateX(-50px)', opacity: 0.5, offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)', backgroundColor: '#A4FF0C', opacity: 1, offset: 0.8
          }),
          style({
            transform: 'translateX(0px)', backgroundColor: '#4DFF8D', opacity: 1, offset: 1
          })
        ]))
      ]),

      transition('* => void', [
        group([
          animate(300, style({
            color: 'white', backgroundColor: '#FF090C', opacity: 0.5
          })),
          animate(800, style({
            transform: 'translateX(100px)', opacity: 0
          }))])


      ])
    ])
  ]
})
export class PhoneticsComponent implements OnInit {
  phonetics$key: string;
  myPhonetics: boolean = false;
  editPhone: any;
  phonetics$: Observable<Phonetic[]>;
  phonetics: Phonetic[];
  dragStartIndex = -1;
  dropIndex = -1;
  dropvalue = '';
  dragElement;

  @ViewChild('editPhonet') phoneticsEditForm: NgForm;

  constructor(private route: ActivatedRoute, private phoneticService: PhoneticService, private dragulaService: DragulaService) {
  }

  onDrag(args) {
    let [e] = args;
    if (e) {
      console.log(`drag:${e.rowIndex}`);
      this.dragStartIndex = e.rowIndex;
    }
  }


  onDrop(args) {
    let [e] = args;
    if (e) {
      console.log(`drop ${e.rowIndex}`);
      this.dropIndex = e.rowIndex;
      this.dropvalue = e.cells[1].innerText;
      this.callReorderEvent();
      if (this.dragStartIndex !== this.dropIndex) {
        // this.phoneticService.updateDragOrder(this.phonetics$key, this.dragStartIndex, this.dropIndex, this.dropvalue);
      }
    }
  }

  callReorderEvent() {
    console.log(`Phonetics : ${this.dropvalue}`)
    console.log(`dragStartIndex : ${this.dragStartIndex}`);
    console.log(`dropIndex : ${this.dropIndex}`);
  }

  ngOnInit() {
    this.phonetics$key = this.route.snapshot.params['phoneticId'];
    this.phonetics$ = this.phoneticService.findPhoneticsByCourse(this.phonetics$key);
    this.phonetics$.subscribe(
      phonetics => this.phonetics = phonetics
    );

    this.dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });

    this.dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });

  }

  addNewPhone() {
    this.myPhonetics = true;
  }

  editPhonetic(i) {
    this.editPhone = i;
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
    this.phoneticService.createPhonetic(this.phonetics$key, form.value)
      .subscribe(
        () => {
          // alert('success in Phonetic creation');
          form.reset();
          this.myPhonetics = false;
        },
        err => alert(`error in creating new alphabet ${err}`)
      );
  }

  editPhonRow() {
    console.log(this.phoneticsEditForm.value);
    this.phoneticService.createPhonetic(this.phonetics$key, this.phoneticsEditForm.value)
      .subscribe(
        () => {
          // alert('success in Phonetic creation');
          this.editPhone = '';
        },
        err => alert(`error in creating new alphabet ${err}`)
      );
  }

  ondeletePhonetics(phonetic: string) {
    if (confirm('Are you sure to delete ?')) {
      this.phoneticService.deletePhonetic(this.phonetics$key, phonetic);
    }
  }

  trackEntryItems(i, item): number {
    return item.id;
  }
}
