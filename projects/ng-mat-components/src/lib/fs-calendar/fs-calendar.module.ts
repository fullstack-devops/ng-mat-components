import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsCalendarComponent } from './fs-calendar.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [FsCalendarComponent],
  declarations: [FsCalendarComponent]
})
export class FsCalendarModule { }


