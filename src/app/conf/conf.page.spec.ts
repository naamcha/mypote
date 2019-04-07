import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfPage } from './conf.page';

describe('ConfPage', () => {
  let component: ConfPage;
  let fixture: ComponentFixture<ConfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
