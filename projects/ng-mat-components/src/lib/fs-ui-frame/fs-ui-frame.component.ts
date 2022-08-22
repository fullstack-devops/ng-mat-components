import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { FrameEvent, NavUser, FrameRoutes, FrameConfig, FrameEvents } from './fs-ui-frame.modules';
import { FsUiFrameService } from './fs-ui-frame.service';

@Component({
  selector: 'fs-ui-frame',
  templateUrl: './fs-ui-frame.component.html',
  styleUrls: ['./fs-ui-frame.component.scss'],
  host: {
    'class': 'fs-ui-frame',
  },
})
export class FsUiFrameComponent implements OnInit {

  @Output() event = new EventEmitter<FrameEvent>();

  @Input() navUser: NavUser | undefined;
  @Input() appRoutes: FrameRoutes = [];
  @Input() frameConfig: FrameConfig = {
    appName: 'Dummy App',
    // appNameShort: stringOfLength('DUMMY', 0, 6),
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1024px-Angular_full_color_logo.svg.png'
  };

  isClosed: boolean = true
  isActivePath: string = ''
  navList: FrameRoutes = []

  constructor(private frameService: FsUiFrameService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.navList = this.appRoutes.filter(elm => {
      return elm.data?.displaySidemenu === true
    });
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          return child
        })
      )
      .subscribe((ttl: ActivatedRoute | null) => {
        ttl?.url.subscribe(obj => {
          this.isActivePath = obj[0].path
        })
      });
  }

  toggleSidemenu() {
    this.frameService.isMenuClosed.emit(!this.isClosed)
    this.isClosed = !this.isClosed
  }

  isNavActive(name: string): boolean {
    return name === this.isActivePath
  }

  onManageAccount(): void {
    const frameEvent: FrameEvent = {
      type: FrameEvents.MANAGE_ACCOUNT,
      data: {},
    }
    this.event.emit(frameEvent);
  }

  onLogout(): void {
    const frameEvent: FrameEvent = {
      type: FrameEvents.LOGOUT,
      data: {},
    }
    this.event.emit(frameEvent);
  }

}
