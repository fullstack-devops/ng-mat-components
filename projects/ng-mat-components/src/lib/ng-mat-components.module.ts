import { FsCalendarComponent } from './components/calendar/calendar.component';
import { MatInputModule } from '@angular/material/input';
import { FsFrameToolbarComponent } from './components/ui-frame-toolbar/frame-toolbar.component';
import { FsFrameContentComponent } from './components/ui-frame-content/frame-content.component';
import { FsUiFrameComponent } from './components/ui-frame/ui-frame.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { FrameToolbarCenterDirective } from './components/ui-frame-toolbar/directives/frame-toolbar-center.directive';
import { FrameToolbarSideDirective } from './components/ui-frame-toolbar/directives/frame-toolbar-side.directive';
import { FrameToolbarTitleDirective } from './components/ui-frame-toolbar/directives/frame-toolbar-title.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    FsUiFrameComponent,
    FsFrameContentComponent,
    FsFrameToolbarComponent,
    FsCalendarComponent,
    /* Direktives */
    FrameToolbarTitleDirective,
    FrameToolbarCenterDirective,
    FrameToolbarSideDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  exports: [
    FsUiFrameComponent,
    FsFrameContentComponent,
    FsFrameToolbarComponent,
    FsCalendarComponent,
    /* Direktives */
    FrameToolbarTitleDirective,
    FrameToolbarCenterDirective,
    FrameToolbarSideDirective,
  ]
})
export class NgMatComponentsModule { }
