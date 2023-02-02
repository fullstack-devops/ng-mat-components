import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-nav-frame-sidebar, [fsNavFrameSidebar]',
  host: { class: 'fs-nav-frame-sidebar' },
})
export class FsNavFrameSidebarDirective {
  constructor() {}
}
