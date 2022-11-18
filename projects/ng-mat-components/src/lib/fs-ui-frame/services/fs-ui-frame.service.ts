import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FsUiFrameService {

  isMenuClosed = new EventEmitter<boolean>();

  constructor() { }
}
