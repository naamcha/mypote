import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tag3Page } from './tag3.page';

describe('Tag3Page', () => {
  let component: Tag3Page;
  let fixture: ComponentFixture<Tag3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tag3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tag3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
