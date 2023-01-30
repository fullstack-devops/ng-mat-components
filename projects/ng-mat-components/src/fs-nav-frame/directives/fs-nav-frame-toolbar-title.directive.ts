import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-nav-frame-toolbar-title, [fsNavFrameToolbarTitle]',
  host: { class: 'fs-nav-frame-toolbar-title' },
})
export class FsNavFrameToolbarTitleDirective {
  constructor() {}
}
