/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiFrameComponent } from './ui-frame.component';

describe('UiFrameComponent', () => {
  let component: UiFrameComponent;
  let fixture: ComponentFixture<UiFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
