/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FrameContentComponent } from './frame-content.component';

describe('FrameContentComponent', () => {
  let component: FrameContentComponent;
  let fixture: ComponentFixture<FrameContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
