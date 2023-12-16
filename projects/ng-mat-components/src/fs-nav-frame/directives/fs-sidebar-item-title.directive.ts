import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-sidebar-item-title, [fsSidebarItemTitle]',
  host: { class: 'fs-sidebar-item-title' },
})
export class FsSidebarItemTitleDirective {
  constructor() {}
}
