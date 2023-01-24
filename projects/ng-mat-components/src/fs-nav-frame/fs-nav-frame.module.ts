import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FsNavFrameToolbarCenterDirective } from './directives/fs-nav-frame-toolbar-center.directive';
import { FsNavFrameToolbarSideDirective } from './directives/fs-nav-frame-toolbar-side.directive';
import { FsNavFrameToolbarTitleDirective } from './directives/fs-nav-frame-toolbar-title.directive';
import { FsNavFrameComponent } from './fs-nav-frame.component';
import { FsNavFrameContentComponent } from './nav-frame-content/fs-nav-frame-content.component';
import { FsNavFrameToolbarComponent } from './nav-frame-toolbar/fs-nav-frame-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    FsNavFrameComponent,
    FsNavFrameToolbarComponent,
    FsNavFrameToolbarCenterDirective,
    FsNavFrameToolbarSideDirective,
    FsNavFrameToolbarTitleDirective,
    FsNavFrameContentComponent,
  ],
  declarations: [
    FsNavFrameComponent,
    FsNavFrameToolbarComponent,
    FsNavFrameToolbarCenterDirective,
    FsNavFrameToolbarSideDirective,
    FsNavFrameToolbarTitleDirective,
    FsNavFrameContentComponent,
  ],
})
export class FsNavFrameModule { }
