import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetBoardComponent } from './alphabet-board.component';

describe('AlphabetBoardComponent', () => {
  let component: AlphabetBoardComponent;
  let fixture: ComponentFixture<AlphabetBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphabetBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
