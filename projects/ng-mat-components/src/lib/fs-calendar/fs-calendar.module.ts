import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FsCalendarTableComponent } from './calendar-table/fs-calendar-table.component';
import { FsCalendarComponent } from './fs-calendar.component';

@NgModule({
  imports: [CommonModule, MatTooltipModule, MatButtonModule, MatDividerModule],
  exports: [FsCalendarComponent, FsCalendarTableComponent],
  declarations: [FsCalendarComponent, FsCalendarTableComponent],
})
export class FsCalendarModule {}
