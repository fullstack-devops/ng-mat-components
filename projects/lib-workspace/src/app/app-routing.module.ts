import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { FrameRoutes } from 'projects/ng-mat-components/src/public-api';
import { CalendarTableComponent } from './content/calendar-table/calendar-table.component';
import { CalenderShowcaseComponent } from './content/calender-showcase/calender-showcase.component';
import { HomeComponent } from './content/home/home.component';
import { SubComponent } from './content/home/sub/sub.component';
import { TestComponent } from './content/test/test.component';

export const routes: FrameRoutes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      displaySidemenu: true,
      sidenavIcon: 'home',
      sidenavText: 'Home',
    },
    children: [
      {
        path: 'sub',
        component: SubComponent,
      },
    ],
  },
  {
    path: 'test',
    component: TestComponent,
    data: {
      displaySidemenu: true,
      sidenavIcon: 'dashboard',
      sidenavText: 'Dashboard',
    },
  },
  {
    path: 'calendar-panels',
    component: CalenderShowcaseComponent,
    data: {
      displaySidemenu: true,
      sidenavIcon: 'calendar_month',
      sidenavText: 'Calendar',
    },
  },
  {
    path: 'calendar-table',
    component: CalendarTableComponent,
    data: {
      displaySidemenu: true,
      sidenavIcon: 'event_note',
      sidenavText: 'Calendar Table',
    },
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
