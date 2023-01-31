import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { Component, OnInit } from '@angular/core';
import { FrameEvent, FrameEvents, NavFrameConfig, NavUser } from 'projects/ng-mat-components/src/public-api';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FS DevOps`s ng mat components';
  appRoutes = routes;

  navFrameConfig: NavFrameConfig = {
    appName: 'Dummy App',
    // appVersion: '0.0.0',
    // logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1024px-Angular_full_color_logo.svg.png',
  };
  navUser: NavUser = {
    // profilePicture: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    name: 'Some User',
    subname: 'Engineer',
  };

  ngOnInit() {
    registerLocaleData(localeDe, 'de-DE', localeDeExtra);
  }

  onEvent(frameEvent: FrameEvent) {
    switch (frameEvent.type) {
      case FrameEvents.MANAGE_ACCOUNT:
        console.log('Manage Account called, do something...');
        break;
      case FrameEvents.LOGOUT:
        console.log('Logout called, do something...');
        break;
      default:
        console.error(`unknown event fetched: ${JSON.stringify(event)}`);
        break;
    }
  }
}
