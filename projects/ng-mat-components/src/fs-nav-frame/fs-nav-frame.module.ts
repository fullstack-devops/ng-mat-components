import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FsNavFrameContentDirective } from './directives/fs-nav-frame-content.directive';
import { FsNavFrameSidebarDirective } from './directives/fs-nav-frame-sidebar.directive';
import { FsNavFrameComponent } from './fs-nav-frame.component';
import { FsNavUserProfileActionsDirective } from './fs-nav-user-profile/directives/fs-nav-user-profile-actions.directive';
import { FsNavUserProfileNameDirective } from './fs-nav-user-profile/directives/fs-nav-user-profile-name.directive';
import { FsNavUserProfileSubNameDirective } from './fs-nav-user-profile/directives/fs-nav-user-profile-subname.directive';
import { FsNavUserProfileComponent } from './fs-nav-user-profile/fs-nav-user-profile.component';
import { FsNavFrameToolbarCenterDirective } from './nav-frame-toolbar/directives/fs-nav-frame-toolbar-center.directive';
import { FsNavFrameToolbarEndDirective } from './nav-frame-toolbar/directives/fs-nav-frame-toolbar-end.directive';
import { FsNavFrameToolbarStartDirective } from './nav-frame-toolbar/directives/fs-nav-frame-toolbar-start.directive';
import { FsNavFrameToolbarComponent } from './nav-frame-toolbar/fs-nav-frame-toolbar.component';

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule, RouterModule, MatIconModule, MatButtonModule],
  exports: [
    FsNavFrameComponent,
    FsNavFrameToolbarComponent,
    FsNavFrameToolbarStartDirective,
    FsNavFrameToolbarCenterDirective,
    FsNavFrameToolbarEndDirective,

    FsNavFrameSidebarDirective,
    FsNavFrameContentDirective,

    FsNavUserProfileComponent,
    FsNavUserProfileNameDirective,
    FsNavUserProfileSubNameDirective,
    FsNavUserProfileActionsDirective,
  ],
  declarations: [
    FsNavFrameComponent,
    FsNavFrameToolbarComponent,
    FsNavFrameToolbarStartDirective,
    FsNavFrameToolbarCenterDirective,
    FsNavFrameToolbarEndDirective,

    FsNavFrameSidebarDirective,
    FsNavFrameContentDirective,

    FsNavUserProfileComponent,
    FsNavUserProfileNameDirective,
    FsNavUserProfileSubNameDirective,
    FsNavUserProfileActionsDirective,
  ],
})
export class FsNavFrameModule {}
