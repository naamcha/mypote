import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromSitePage } from './from-site.page';

describe('FromSitePage', () => {
  let component: FromSitePage;
  let fixture: ComponentFixture<FromSitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromSitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromSitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
