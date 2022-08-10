import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiFrameService {

  isMenuClosed = new EventEmitter<boolean>();

  constructor() { }
}
