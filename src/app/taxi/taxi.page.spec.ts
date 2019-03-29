import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiPage } from './taxi.page';

describe('TaxiPage', () => {
  let component: TaxiPage;
  let fixture: ComponentFixture<TaxiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
