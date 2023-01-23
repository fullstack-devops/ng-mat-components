import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FsUiFrameService } from '../services/fs-ui-frame.service';

@Component({
  selector: 'fs-ui-frame-toolbar',
  templateUrl: './fs-ui-frame-toolbar.component.html',
  styleUrls: ['./fs-ui-frame-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-ui-frame-toolbar',
  },
})
export class FsUiFrameToolbarComponent implements OnInit, OnDestroy {
  @Input() menuOpened: boolean = false;

  @HostBinding('class') openedClass = '';

  constructor(private frameService: FsUiFrameService) {
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
