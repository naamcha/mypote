import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSitePage } from './to-site.page';

describe('ToSitePage', () => {
  let component: ToSitePage;
  let fixture: ComponentFixture<ToSitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToSitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToSitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
