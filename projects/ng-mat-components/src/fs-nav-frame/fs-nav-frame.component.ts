import { Component, ContentChild, ElementRef, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { NavFrameConfig, NavRoutes } from './fs-nav-frame.modules';
import { FsNavFrameService, MenuState } from './services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-frame',
  templateUrl: './fs-nav-frame.component.html',
  styleUrls: ['./fs-nav-frame.component.scss'],
  host: {
    class: 'fs-nav-frame',
  },
})
export class FsNavFrameComponent implements OnInit, OnDestroy {
  @Input() navRoutes: NavRoutes = [];
  @Input() navFrameConfig: NavFrameConfig = {
    appName: 'Demo App',
  };

  @ContentChild('navLinks') navLinks: TemplateRef<any> | undefined;

  profileContentElement!: HTMLElement | null;
  isClosed: boolean = true;

  constructor(private elementRef: ElementRef, private frameService: FsNavFrameService, private titleService: Title) {}

  ngOnInit(): void {
    this.frameService.menuStateEvent.subscribe((state: MenuState) => {
      if (state == MenuState.OPENED) {
        this.frameService.menuState = MenuState.OPENED;
        this.isClosed = false;
        if (this.profileContentElement != null) {
          this.profileContentElement.classList.add('opened');
        }
      } else {
        this.frameService.menuState = MenuState.CLOSED;
        this.isClosed = true;
        if (this.profileContentElement != null) {
          this.profileContentElement.classList.remove('opened');
        }
      }
    });
  }

  ngAfterViewInit() {
    this.profileContentElement = (<HTMLElement>this.elementRef.nativeElement).querySelector('.fs-nav-user-profile .profile-content-wrapper');
  }

  ngOnDestroy(): void {
    this.frameService.menuStateEvent.unsubscribe();
  }

  toggleSidemenu() {
    this.frameService.switchMenuState();
  }

  closeSidebar() {
    if (this.frameService.menuState == MenuState.OPENED) {
      this.frameService.switchMenuState();
    }
  }
}
