import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FsCalendarPanelsComponent } from './calendar-panels/calendar-panels.component';
import { FsCalendarTableComponent } from './calendar-table/fs-calendar-table.component';
import { FsCalendarTableNameDirective } from './directives/fs-calendar-table-name.directive';

@NgModule({
  declarations: [
    FsCalendarPanelsComponent,
    FsCalendarTableComponent,
    FsCalendarTableNameDirective,
  ],
  imports: [CommonModule, MatButtonModule, MatDividerModule],
  exports: [
    FsCalendarPanelsComponent,
    FsCalendarTableComponent,
    FsCalendarTableNameDirective,
  ],
})
export class FsCalendarModule {}
