import { Component, Input, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {LessonService} from '../shared/model/lesson.service';
import { AlphabetService } from '../shared/model/alphabet.service';
import {Observable} from 'rxjs/Observable';
import {LessonItem} from '../shared/model/lesson-item';
import {ActivatedRoute, Router} from '@angular/router';
import { AlphabetBoardComponent } from "app/learn/board/alphabet-board.component";
import { WordBoardComponent } from "app/learn/board/word-board.component";
import { BoardDirective } from "app/learn/board.directive";
import { BoardComponent } from "app/learn/board.component";
import { AlphabetQuizComponent } from "app/learn/quiz/alphabet-quiz.component";
import { WordQuizComponent } from "app/learn/quiz/word-quiz.component";
import { Lesson } from "app/shared/model/lesson";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements AfterViewInit, OnInit {
  lessonItems$: Observable<LessonItem[]>;
  lesson$: Observable<Lesson>;
  currentIndex: number = -1;
  completed: number = 0;
  toReview: number = 0;
  reviewMode: boolean = false;
  @ViewChild(BoardDirective) board: BoardDirective;
  lessonItems: LessonItem[];
  lesson: Lesson;
  courseId: string;

  static componentConfig = {
    'alphabets': AlphabetBoardComponent,
    'words': WordBoardComponent
  };

  static chunk = 4;

  constructor(private lessonService: LessonService,
    private activatedRoute: ActivatedRoute,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private router: Router) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.params['courseId'];
    const lessonId = this.activatedRoute.snapshot.params['lessonId'];
    this.lessonItems$ = this.lessonService.getLessonItemsForSession(lessonId);
    this.lesson$ = this.lessonService.getLessonForSession(lessonId, this.courseId);
    Observable.forkJoin(this.lessonItems$, this.lesson$)
      .subscribe(
        ([lessonItems, lesson]) => {
          this.lessonItems = lessonItems;
          this.lesson = lesson;
          this.loadComponent();
      }
    );

  }

  ngAfterViewInit(): void {
    // this.loadComponent();
  }

  loadComponent() {
    if(this.toReview == 0 && this.currentIndex >= this.lessonItems.length - 1) {
      this.router.navigate(['/lesson', this.courseId]);
    }
    if((this.currentIndex + 1) % SessionComponent.chunk == 0) {

    }

    this.currentIndex = this.currentIndex + 1;
    let lessonItem = this.lessonItems[this.currentIndex];

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(SessionComponent.componentConfig[this.lesson.teach]);

    let viewContainerRef = this.board.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<BoardComponent>componentRef.instance).lessonItems = this.lessonItems;
    (<BoardComponent>componentRef.instance).currentIndex = this.currentIndex;
    (<BoardComponent>componentRef.instance).readyToGo.subscribe(this.readyToGo);


    this.completed = (this.currentIndex + 1) / this.lessonItems.length * 100;
  }

  readyToGo(tries: number) {
    console.log('ready');
  }

}
