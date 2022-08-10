import { Directive } from '@angular/core';

@Directive({
  selector: 'frame-toolbar-side, [frameToolbarSide]',
  host: {'class': 'frame-toolbar-side'},
})
export class FrameToolbarSideDirective {

  constructor() { }

}
