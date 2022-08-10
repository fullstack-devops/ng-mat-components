import { UiFrameService } from './../../services/ui-frame.service';
import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'frame-content',
  templateUrl: './frame-content.component.html',
  styleUrls: ['./frame-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'frame-content',
  },
})
export class FsFrameContentComponent implements OnInit {

  @HostBinding('class') openedClass = '';

  constructor(private frameService: UiFrameService) {
    this.frameService.isMenuClosed.subscribe((bool: Boolean) => {
      if (bool) {
        this.openedClass = ""
      } else {
        this.openedClass = "opened"
      }
    })
  }

  ngOnInit() {
  }

}
