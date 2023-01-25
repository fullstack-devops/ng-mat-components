import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-nav-frame-toolbar-side, [fsNavFrameToolbarSide]',
  host: { 'class': 'fs-nav-frame-toolbar-side' },
})
export class FsNavFrameToolbarSideDirective {

  constructor() { }

}
