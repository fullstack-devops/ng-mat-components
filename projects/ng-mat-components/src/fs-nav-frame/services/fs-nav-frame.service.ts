import { EventEmitter, Injectable } from '@angular/core';

export enum MenuState {
  CLOSED = 'closed',
  OPENED = 'opened',
}

@Injectable()
export class FsNavFrameService {
  isMenuClosed = new EventEmitter<boolean>();
  menuState: MenuState = MenuState.CLOSED;
  menuStateEvent = new EventEmitter<MenuState>();

  constructor() {}

  switchMenuState() {
    if (this.menuState == MenuState.OPENED) {
      this.menuStateEvent.emit(MenuState.CLOSED);
    } else {
      this.menuStateEvent.emit(MenuState.OPENED);
    }
  }
}
