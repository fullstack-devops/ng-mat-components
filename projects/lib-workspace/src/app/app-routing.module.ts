import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { FrameRoutes } from 'projects/ng-mat-components/src/public-api';
import { HomeComponent } from './content/home/home.component';
import { ShowcaseCalendarPanelsComponent } from './content/showcase-calendar-panels/showcase-calendar-panels.component';
import { ShowcaseCalendarTableComponent } from './content/showcase-calendar-table/showcase-calendar-table.component';
import { ShowcaseNavFrameComponent } from './content/showcase-nav-frame/showcase-nav-frame.component';

export const routes: FrameRoutes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      displaySidemenu: true,
      sidenavIcon: 'home',
      sidenavText: 'Home',
    },
  },
  {
    path: 'nav-frame',
    component: ShowcaseNavFrameComponent,
    data: {
      displaySidemenu: true,
      sidenavIcon: 'pivot_table_chart',
      sidenavText: 'Ui Frame',
    },
  },
  {
    path: 'calendar-panels',
    component: ShowcaseCalendarPanelsComponent,
    data: {
      displaySidemenu: true,
      sidenavIcon: 'calendar_month',
      sidenavText: 'Calendar',
    },
  },
  {
    path: 'calendar-table',
    component: ShowcaseCalendarTableComponent,
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
export class AppRoutingModule { }
