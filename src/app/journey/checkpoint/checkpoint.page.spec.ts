import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpointPage } from './checkpoint.page';

describe('CheckpointPage', () => {
  let component: CheckpointPage;
  let fixture: ComponentFixture<CheckpointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckpointPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
