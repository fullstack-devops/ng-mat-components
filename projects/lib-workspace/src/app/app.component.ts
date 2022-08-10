import { Component } from '@angular/core';
import { FrameConfig, NavUser, FrameEvent, FrameEvents } from 'projects/ng-mat-components/src/public-api';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FS DevOps`s ng mat components';
  appRoutes = routes;

  frameConfig: FrameConfig = {
    appName: 'Dummy App',
    // appNameShort: stringOfLength('DUMMY', 0, 6),
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1024px-Angular_full_color_logo.svg.png'
  };
  navUser: NavUser = {
    profilePicture: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    name: 'Some User',
    role: 'Engineer'
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
