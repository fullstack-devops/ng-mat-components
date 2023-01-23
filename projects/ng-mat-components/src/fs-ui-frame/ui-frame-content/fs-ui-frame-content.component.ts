import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FsUiFrameService } from '../services/fs-ui-frame.service';

@Component({
  selector: 'fs-ui-frame-content',
  templateUrl: './fs-ui-frame-content.component.html',
  styleUrls: ['./fs-ui-frame-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-ui-frame-content',
  },
})
export class FsUiFrameContentComponent implements OnInit {
  @HostBinding('class') openedClass = '';

  constructor(private frameService: FsUiFrameService) {
    this.frameService.isMenuClosed.subscribe((bool: Boolean) => {
      if (bool) {
        this.openedClass = '';
      } else {
        this.openedClass = 'opened';
      }
    });
  }

  ngOnInit() {}
}
