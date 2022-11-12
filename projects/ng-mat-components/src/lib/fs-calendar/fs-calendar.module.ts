import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FsCalendarPanelsComponent } from './calendar-panels/calendar-panels.component';
import { FsCalendarTableComponent } from './calendar-table/fs-calendar-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatTableModule,
  ],
  exports: [FsCalendarPanelsComponent, FsCalendarTableComponent],
  declarations: [FsCalendarPanelsComponent, FsCalendarTableComponent],
})
export class FsCalendarModule {}
