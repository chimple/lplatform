import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageAlphabetComponent } from './language-alphabet.component';

describe('LanguageAlphabetComponent', () => {
  let component: LanguageAlphabetComponent;
  let fixture: ComponentFixture<LanguageAlphabetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageAlphabetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageAlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
