import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { FrameRoutes } from 'projects/ng-mat-components/src/public-api';
import { HomeComponent } from './content/home/home.component';
import { ShowcaseCalendarPanelsComponent } from './content/showcase-calendar-panels/showcase-calendar-panels.component';
import { ShowcaseCalendarTableComponent } from './content/showcase-calendar-table/showcase-calendar-table.component';
import { ShowcaseUiFrameComponent } from './content/showcase-ui-frame/showcase-ui-frame.component';
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
    path: 'ui-frame',
    component: ShowcaseUiFrameComponent,
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
export class AppRoutingModule {}
