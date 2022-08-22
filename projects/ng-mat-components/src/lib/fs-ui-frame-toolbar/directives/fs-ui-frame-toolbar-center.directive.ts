import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-ui-frame-toolbar-center, [fsUiFrameToolbarCenter]',
  host: {'class': 'fs-ui-frame-toolbar-center'},
})
export class FsUiFrameToolbarCenterDirective {

  constructor() { }

}
