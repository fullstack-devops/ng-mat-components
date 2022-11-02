import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalenderShowcaseComponent } from './content/calender-showcase/calender-showcase.component';

import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { de } from 'date-fns/locale';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  FsCalendarModule,
  FsCalendarService,
  FsMaterialFullModule,
  FsUiFrameContentModule,
  FsUiFrameModule,
  FsUiFrameToolbarModule,
} from 'projects/ng-mat-components/src/public-api';
import { CalendarTableComponent } from './content/calendar-table/calendar-table.component';
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
    CalendarTableComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    /* Lib modules */
    FsMaterialFullModule,
    FsUiFrameModule,
    FsUiFrameContentModule,
    FsUiFrameToolbarModule,
    FsCalendarModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '.',
    },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    {
      provide: 'FS_DATE_LOCALE',
      useClass: FsCalendarService,
      useValue: de,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
