import { Directive } from '@angular/core';

@Directive({
  selector: 'frame-toolbar-center, [frameToolbarCenter]',
  host: {'class': 'frame-toolbar-center'},
})
export class FrameToolbarCenterDirective {

  constructor() { }

}
