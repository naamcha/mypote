import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegElevatorOneTwoPage } from './seg-elevator-one-two.page';

describe('SegElevatorOneTwoPage', () => {
  let component: SegElevatorOneTwoPage;
  let fixture: ComponentFixture<SegElevatorOneTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegElevatorOneTwoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegElevatorOneTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
