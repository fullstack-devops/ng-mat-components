import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-ui-frame-toolbar-title, [fsUiFrameToolbarTitle]',
  host: {'class': 'fs-ui-frame-toolbar-title'},
})
export class FsUiFrameToolbarTitleDirective {

  constructor() { }

}
