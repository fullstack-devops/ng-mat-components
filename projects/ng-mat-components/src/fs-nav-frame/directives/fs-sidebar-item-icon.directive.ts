import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-sidebar-item-icon, [fsSidebarItemIcon]',
  host: { class: 'fs-sidebar-item-icon' },
})
export class FsSidebarItemIconDirective {
  constructor() {}
}
