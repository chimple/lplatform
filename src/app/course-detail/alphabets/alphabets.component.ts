import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Alphabet} from '../../shared/model/alphabet';
import {AlphabetService} from '../../shared/model/alphabet.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {RecordAudioComponent} from '../../record-audio/record-audio.component';
import {DragulaService} from 'ng2-dragula';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

// declare var swal: any;

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabets.component.html',
  styleUrls: ['./alphabets.component.css'],
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
            transform: 'translateX(-20px)', opacity: 1, offset: 0.8
          }),
          style({
            transform: 'translateX(0px)', opacity: 1, offset: 1
          })
        ]))
      ]),

      transition('* => void', [
        group([
          animate(100, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)', opacity: 0
          }))])


      ])
    ])
  ]
})

export class AlphabetComponent implements OnInit {

  alphabets$: Observable<Alphabet[]>;
  alphabet$Key: string;
  alphabets: Alphabet[];
  myAlphabet: boolean = false;
  editAlpha: any;
  onPlay = false;
  dragStartIndex = -1;
  dropIndex = -1;
  dropvalue = '';
  dragElement;

  @ViewChild('editAlphabet') editAlphabetData: NgForm;

  constructor(private route: ActivatedRoute,
              private alphabetService: AlphabetService,
              private dragulaService: DragulaService,) {

    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });

    dragulaService.drop.subscribe((value) => {

      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
      console.log(this.alphabet$Key);
    });
  }

  onDrag(args) {
    let [e] = args;
    if (e) {
      console.log(`drag:${e.rowIndex}`);
      this.dragStartIndex = e.rowIndex;
    }
  }


  onDrop(args) {
    const [e] = args;
    if (e) {
      console.log(`drop ${e.rowIndex}`);
      this.dropIndex = e.rowIndex;
      this.dropvalue = e.cells[2].innerText;
      this.callReorderEvent();
      console.log(this.dropvalue);
      // this.alphabetService.updateDragOrder(this.alphabet$Key, this.dragStartIndex, this.dropIndex, this.dropvalue);
    }
  }

  callReorderEvent() {
    console.log(`dragStartIndex ${this.dragStartIndex}`);
    console.log(`dropIndex ${this.dropIndex}`);
  }


  ngOnInit() {
    this.alphabet$Key = this.route.snapshot.params['alphabetId'];
    this.alphabets$ = this.alphabetService.findAlphabetsByCourse(this.alphabet$Key);
    this.alphabets$.subscribe(
      alphabets => this.alphabets = alphabets
    );
  }

  onPlays() {
    this.onPlay = true;
  }

  editAlphRow(editAlphabetData: NgForm) {
    this.alphabetService.createAlphabet(this.alphabet$Key, this.editAlphabetData.value
    )
      .subscribe(
        () => {
          // alert('success in alphabet creation');
          this.editAlpha = '';
        },
        err => alert(`error in creating new alphabet ${err}`)
      );
  }

  editAlph(i) {
    this.editAlpha = i;
    console.log(i);
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

// onRecord() {
//   swal({
//     title: 'Are you sure?',
//     text: ' You wont be able to revert this! ',
//     type: 'warning',
//     template: ` <app-record-audio>
//             </app-record-audio> `,
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then(function () {
//
//     swal(
//       'cleared!',
//       'Your paper name is cleared.',
//       'success'
//     );
//   });
// }

  deleteAlphRow(alphabet: string) {
    console.log(alphabet);
    this.alphabetService.deleteAlphabet(this.alphabet$Key, alphabet);
  }


  save(form: NgForm) {
    console.log(JSON.stringify(form.value));
    console.log('Key Key: ', this.alphabet$Key);
    this.alphabetService.createAlphabet(this.alphabet$Key, form.value)
      .subscribe(
        () => {
          //  alert('success in alphabet creation');
          form.reset();
        },
        err => alert(`error in creating new alphabet ${err}`)
      );
  }

  private trackEntryItems(i, item): number {
    return item.id;
  }

}
