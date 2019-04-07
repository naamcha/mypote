import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomHelpPage } from './room-help.page';

describe('RoomHelpPage', () => {
  let component: RoomHelpPage;
  let fixture: ComponentFixture<RoomHelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomHelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
