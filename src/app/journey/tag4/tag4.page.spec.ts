import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tag4Page } from './tag4.page';

describe('Tag4Page', () => {
  let component: Tag4Page;
  let fixture: ComponentFixture<Tag4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tag4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tag4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
