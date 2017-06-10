import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordQuizComponent } from './word-quiz.component';

describe('WordQuizComponent', () => {
  let component: WordQuizComponent;
  let fixture: ComponentFixture<WordQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
