import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMatComponentsComponent } from './ng-mat-components.component';

describe('NgMatComponentsComponent', () => {
  let component: NgMatComponentsComponent;
  let fixture: ComponentFixture<NgMatComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgMatComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMatComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
