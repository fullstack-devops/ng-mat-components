import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { FsNavFrameService } from './services/fs-nav-frame.service';
import { FrameConfig, FrameEvent, FrameEvents, FrameRoutes, NavUser } from './nav-frame.modules';

@Component({
  selector: 'fs-nav-frame',
  templateUrl: './fs-nav-frame.component.html',
  styleUrls: ['./fs-nav-frame.component.scss'],
  host: {
    class: 'fs-nav-frame',
  },
})
export class FsNavFrameComponent implements OnInit {
  @Output() event = new EventEmitter<FrameEvent>();

  @Input() navUser: NavUser | undefined;
  @Input() appRoutes: FrameRoutes = [];
  @Input() frameConfig: FrameConfig = {
    appName: 'Dummy App',
    // appNameShort: stringOfLength('DUMMY', 0, 6),
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1024px-Angular_full_color_logo.svg.png',
  };

  isClosed: boolean = true;
  isActivePath: string = '';
  navList: FrameRoutes = [];

  constructor(private frameService: FsNavFrameService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.navList = this.appRoutes.filter(elm => {
      return elm.data?.displaySidemenu === true;
    });
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          return child;
        })
      )
      .subscribe((ttl: ActivatedRoute | null) => {
        ttl?.url.subscribe(obj => {
          this.isActivePath = obj[0].path;
        });
      });
  }

  toggleSidemenu() {
    this.frameService.isMenuClosed.emit(!this.isClosed);
    this.isClosed = !this.isClosed;
  }

  closeSidebar() {
    if (!this.isClosed) {
      this.toggleSidemenu();
    }
  }

  isNavActive(name: string): boolean {
    return name === this.isActivePath;
  }

  onManageAccount(): void {
    const frameEvent: FrameEvent = {
      type: FrameEvents.MANAGE_ACCOUNT,
      data: {},
    };
    this.event.emit(frameEvent);
  }

  onLogout(): void {
    const frameEvent: FrameEvent = {
      type: FrameEvents.LOGOUT,
      data: {},
    };
    this.event.emit(frameEvent);
  }
}
