import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsUiFrameToolbarCenterDirective } from './directives/fs-ui-frame-toolbar-center.directive';
import { FsUiFrameToolbarSideDirective } from './directives/fs-ui-frame-toolbar-side.directive';
import { FsUiFrameToolbarTitleDirective } from './directives/fs-ui-frame-toolbar-title.directive';
import { FsUiFrameComponent } from './fs-ui-frame.component';
import { FsUiFrameContentComponent } from './ui-frame-content/fs-ui-frame-content.component';
import { FsUiFrameToolbarComponent } from './ui-frame-toolbar/fs-ui-frame-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
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
    FsUiFrameToolbarComponent,
    FsUiFrameToolbarCenterDirective,
    FsUiFrameToolbarSideDirective,
    FsUiFrameToolbarTitleDirective,
    FsUiFrameContentComponent,
  ],
  declarations: [
    FsUiFrameComponent,
    FsUiFrameToolbarComponent,
    FsUiFrameToolbarCenterDirective,
    FsUiFrameToolbarSideDirective,
    FsUiFrameToolbarTitleDirective,
    FsUiFrameContentComponent,
  ],
})
export class FsUiFrameModule {}
