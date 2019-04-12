import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegOnePage } from './seg-one.page';

describe('SegOnePage', () => {
  let component: SegOnePage;
  let fixture: ComponentFixture<SegOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegOnePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
