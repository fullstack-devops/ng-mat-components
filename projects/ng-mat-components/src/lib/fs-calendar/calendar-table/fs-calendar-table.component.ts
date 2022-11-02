import { Component, OnInit } from '@angular/core';
import * as dateFns from 'date-fns';
import { Month } from '../calendar.models';
import { FsCalendarService } from '../fs-calendar.service';

@Component({
  selector: 'fs-calendar-table',
  templateUrl: './fs-calendar-table.component.html',
  styleUrls: ['./fs-calendar-table.component.scss'],
  host: {
    class: 'fs-calendar-table',
  },
})
export class FsCalendarTableComponent implements OnInit {
  isLoading: boolean = true;

  month: Month | null = null;

  constructor(private calendarService: FsCalendarService) {}

  ngOnInit() {
    this.isLoading = false;
    this.month = this.calendarService.generateMonth(10, 2022);
  }

  isToday(date: Date): boolean {
    return dateFns.isSameDay(new Date(), date);
  }
}
