import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNumbersPage } from './site-numbers.page';

describe('SiteNumbersPage', () => {
  let component: SiteNumbersPage;
  let fixture: ComponentFixture<SiteNumbersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteNumbersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteNumbersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
