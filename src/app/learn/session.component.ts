import { Component, OnInit } from '@angular/core';
import {LessonService} from '../shared/model/lesson.service';
import {Observable} from 'rxjs/Observable';
import {LessonItem} from '../shared/model/lesson-item';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  lessonItems$: Observable<LessonItem[]>;
  constructor(private lessonService: LessonService, private router: ActivatedRoute) { }

  ngOnInit() {
    const lessonId = this.router.snapshot.params['lessonId'];
    this.lessonItems$ = this.lessonService.getLessonItems(lessonId);
  }

}
