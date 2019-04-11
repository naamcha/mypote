import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiePage } from './rie.page';

describe('RiePage', () => {
  let component: RiePage;
  let fixture: ComponentFixture<RiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
