import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCourseComponent } from './register-course.component';

describe('RegisterCourseComponent', () => {
  let component: RegisterCourseComponent;
  let fixture: ComponentFixture<RegisterCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
