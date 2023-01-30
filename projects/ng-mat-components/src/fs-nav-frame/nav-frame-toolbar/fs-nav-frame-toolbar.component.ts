import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FsNavFrameService } from '../services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-frame-toolbar',
  templateUrl: './fs-nav-frame-toolbar.component.html',
  styleUrls: ['./fs-nav-frame-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-nav-frame-toolbar',
  },
})
export class FsNavFrameToolbarComponent implements OnInit, OnDestroy {
  @Input() menuOpened: boolean = false;

  @HostBinding('class') openedClass = '';

  constructor(private frameService: FsNavFrameService) {
    this.frameService.isMenuClosed.subscribe((bool: boolean) => {
      if (bool) {
        this.openedClass = '';
      } else {
        this.openedClass = 'opened';
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.frameService.isMenuClosed.unsubscribe();
  }
}
