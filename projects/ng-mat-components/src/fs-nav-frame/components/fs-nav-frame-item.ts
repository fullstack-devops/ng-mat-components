import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FsNavFrameService, MenuState } from '../services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-frame-item, a[fs-nav-frame-item], button[fs-nav-frame-item]',
  exportAs: 'fsNavFrameItem',
  template: `
    <ng-template>
      <button mat-button>
        <ng-content select="fs-sidebar-item-icon"></ng-content>
        <ng-content select="fs-sidebar-item-title" *ngIf="!closed"></ng-content>
      </button>
    </ng-template>
  `,
  styles: [
    `
      .fs-nav-frame-item {
        height: 4rem;
        display: block;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-nav-frame-item',
  },
  standalone: true,
  imports: [CommonModule],
})
export class FsNavFrameItem implements OnInit {
  @Input() routerLink: string | undefined;
  @ViewChild(TemplateRef) template: TemplateRef<any> | undefined;

  closed: boolean = true;
  isActivePath: string = '';

  constructor(public frameService: FsNavFrameService) {
    this.frameService.menuStateEvent.subscribe(state => {
      if (state == MenuState.OPENED) {
        this.closed = false;
      } else {
        this.closed = true;
      }
    });
  }

  ngOnInit() {}
}
