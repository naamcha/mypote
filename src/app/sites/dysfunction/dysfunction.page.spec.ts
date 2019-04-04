import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DysfunctionPage } from './dysfunction.page';

describe('DysfunctionPage', () => {
  let component: DysfunctionPage;
  let fixture: ComponentFixture<DysfunctionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DysfunctionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DysfunctionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
