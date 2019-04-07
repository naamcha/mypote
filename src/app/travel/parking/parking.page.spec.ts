import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPage } from './parking.page';

describe('ParkingPage', () => {
  let component: ParkingPage;
  let fixture: ComponentFixture<ParkingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
