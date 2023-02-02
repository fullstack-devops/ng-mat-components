import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { de } from 'date-fns/locale';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FsCalendarModule, FsCalendarService, FsMaterialFullModule, FsNavFrameModule } from 'projects/ng-mat-components/src/public-api';
import { HomeComponent } from './content/home/home.component';
import { ShowcaseCalendarPanelsComponent } from './content/showcase-calendar-panels/showcase-calendar-panels.component';
import { ShowcaseCalendarTableComponent } from './content/showcase-calendar-table/showcase-calendar-table.component';
import { ShowcaseNavFrameComponent } from './content/showcase-nav-frame/showcase-nav-frame.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ShowcaseCalendarPanelsComponent, ShowcaseCalendarTableComponent, ShowcaseNavFrameComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    /* Lib modules */
    FsMaterialFullModule,
    FsNavFrameModule,
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
