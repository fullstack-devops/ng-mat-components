import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FsCalendarComponent } from './fs-calendar.component';

@NgModule({
  imports: [CommonModule, MatTooltipModule, MatButtonModule],
  exports: [FsCalendarComponent],
  declarations: [FsCalendarComponent],
})
export class FsCalendarModule {}
