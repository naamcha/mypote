import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateWifiPage } from './associate-wifi.page';

describe('AssociateWifiPage', () => {
  let component: AssociateWifiPage;
  let fixture: ComponentFixture<AssociateWifiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateWifiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateWifiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
