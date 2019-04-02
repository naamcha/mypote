import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tag2Page } from './tag2.page';

describe('Tag2Page', () => {
  let component: Tag2Page;
  let fixture: ComponentFixture<Tag2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tag2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tag2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
