import { CalenderShowcaseComponent } from './content/calender-showcase/calender-showcase.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import {
  FsCalendarModule,
  FsUiFrameModule,
  FsUiFrameContentModule,
  FsUiFrameToolbarModule
} from 'projects/ng-mat-components/src/public-api';
import { HomeComponent } from './content/home/home.component';
import { SubComponent } from './content/home/sub/sub.component';
import { TestComponent } from './content/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    SubComponent,
    CalenderShowcaseComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    /* Lib modules */
    FsUiFrameModule,
    FsUiFrameContentModule,
    FsUiFrameToolbarModule,
    FsCalendarModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: ".",
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
