import { Component, Input, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {LessonService} from '../shared/model/lesson.service';
import {Observable} from 'rxjs/Observable';
import {LessonItem} from '../shared/model/lesson-item';
import {BoardDirective} from './board/board.directive';
import {ActivatedRoute, Router} from '@angular/router';
import { AlphabetBoardComponent } from "app/learn/board/alphabet-board.component";
import { BoardComponent } from "app/learn/board/board.component";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements AfterViewInit, OnInit {
  lessonItems$: Observable<LessonItem[]>;
  currentIndex: number = -1;
  @ViewChild(BoardDirective) board: BoardDirective;
  lessonItems: LessonItem[];

  constructor(private lessonService: LessonService, private router: ActivatedRoute, private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const lessonId = this.router.snapshot.params['lessonId'];
    this.lessonItems$ = this.lessonService.getLessonItems(lessonId);
    this.lessonItems$.subscribe(
      lessonItems => {
        this.lessonItems = lessonItems;
        this.loadComponent();
      }
    );

  }

  ngAfterViewInit(): void {
    // this.loadComponent();
  }

  loadComponent() {
    this.currentIndex = this.currentIndex + 1;
    let lessonItem = this.lessonItems[this.currentIndex];

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(AlphabetBoardComponent);

    let viewContainerRef = this.board.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<BoardComponent>componentRef.instance).lessonItem = this.lessonItems[this.currentIndex];

  }

}
