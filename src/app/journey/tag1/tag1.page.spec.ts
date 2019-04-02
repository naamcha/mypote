import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tag1Page } from './tag1.page';

describe('Tag1Page', () => {
  let component: Tag1Page;
  let fixture: ComponentFixture<Tag1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tag1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tag1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
