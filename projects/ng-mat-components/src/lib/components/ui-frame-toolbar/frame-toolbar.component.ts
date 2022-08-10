import { UiFrameService } from './../../services/ui-frame.service';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'frame-toolbar',
  templateUrl: './frame-toolbar.component.html',
  styleUrls: ['./frame-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'frame-toolbar',
  },
})
export class FsFrameToolbarComponent implements OnInit {
  @Input() menuOpened: boolean = false;

  @HostBinding('class') openedClass = '';

  constructor(private frameService: UiFrameService) {
    this.frameService.isMenuClosed.subscribe((bool: boolean) => {
      if (bool) {
        this.openedClass = ""
      } else {
        this.openedClass = "opened"
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.frameService.isMenuClosed.unsubscribe()
  }

}
