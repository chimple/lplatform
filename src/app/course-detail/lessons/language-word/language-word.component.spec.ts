import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageWordComponent } from './language-word.component';

describe('LanguageWordComponent', () => {
  let component: LanguageWordComponent;
  let fixture: ComponentFixture<LanguageWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
