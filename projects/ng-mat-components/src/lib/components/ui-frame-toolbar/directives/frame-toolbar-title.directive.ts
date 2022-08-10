import { Directive } from '@angular/core';

@Directive({
  selector: 'frame-toolbar-title, [frameToolbarTitle]',
  host: {'class': 'frame-toolbar-title'},
})
export class FrameToolbarTitleDirective {

  constructor() { }

}
