import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsUiFrameToolbarComponent } from './fs-ui-frame-toolbar.component';
import { FsUiFrameToolbarTitleDirective } from './directives/fs-ui-frame-toolbar-title.directive';
import { FsUiFrameToolbarCenterDirective } from './directives/fs-ui-frame-toolbar-center.directive';
import { FsUiFrameToolbarSideDirective } from './directives/fs-ui-frame-toolbar-side.directive';

@NgModule({
  declarations: [
    FsUiFrameToolbarComponent,
    /* Direktives */
    FsUiFrameToolbarTitleDirective,
    FsUiFrameToolbarCenterDirective,
    FsUiFrameToolbarSideDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FsUiFrameToolbarComponent,
    /* Direktives */
    FsUiFrameToolbarTitleDirective,
    FsUiFrameToolbarCenterDirective,
    FsUiFrameToolbarSideDirective
  ],
})
export class FsUiFrameToolbarModule { }
