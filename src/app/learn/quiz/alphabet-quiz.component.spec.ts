import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetQuizComponent } from './alphabet-quiz.component';

describe('AlphabetQuizComponent', () => {
  let component: AlphabetQuizComponent;
  let fixture: ComponentFixture<AlphabetQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphabetQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
