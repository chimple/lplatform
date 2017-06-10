import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordBoardComponent } from './word-board.component';

describe('WordBoardComponent', () => {
  let component: WordBoardComponent;
  let fixture: ComponentFixture<WordBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
