import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FsNavFrameService } from '../services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-frame-content',
  templateUrl: './fs-nav-frame-content.component.html',
  styleUrls: ['./fs-nav-frame-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-nav-frame-content',
  },
})
export class FsNavFrameContentComponent implements OnInit {
  @HostBinding('class') openedClass = '';

  constructor(private frameService: FsNavFrameService) {
    this.frameService.isMenuClosed.subscribe((bool: Boolean) => {
      if (bool) {
        this.openedClass = '';
      } else {
        this.openedClass = 'opened';
      }
    });
  }

  ngOnInit() { }
}
