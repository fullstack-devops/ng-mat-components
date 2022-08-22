import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-ui-frame-toolbar-side, [fsUiFrameToolbarSide]',
  host: {'class': 'fs-ui-frame-toolbar-side'},
})
export class FsUiFrameToolbarSideDirective {

  constructor() { }

}
