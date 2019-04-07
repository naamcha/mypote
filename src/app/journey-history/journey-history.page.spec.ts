import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyHistoryPage } from './journey-history.page';

describe('JourneyHistoryPage', () => {
  let component: JourneyHistoryPage;
  let fixture: ComponentFixture<JourneyHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
