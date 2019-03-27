import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDetailPage } from './site-detail.page';

describe('SiteDetailPage', () => {
  let component: SiteDetailPage;
  let fixture: ComponentFixture<SiteDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
