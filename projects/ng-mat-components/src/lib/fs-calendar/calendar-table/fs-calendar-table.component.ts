import { Component, Input, OnInit } from '@angular/core';
import * as dateFns from 'date-fns';
import {
  CalendarExtendedDay,
  CalendarMonth,
  CalendarTable,
} from '../calendar.models';
import { FsCalendarService } from '../services/fs-calendar.service';

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

  currentMonth: CalendarMonth | undefined;
  tableData: CalendarTable | undefined;

  private _monthNumber: number = dateFns.getMonth(new Date());
  private _yearNumber: number = dateFns.getYear(new Date());

  @Input()
  set dataSource(data: CalendarTable) {
    this.tableData = data;
    this.genMonthData();
  }

  @Input()
  set month(data: number) {
    this._monthNumber = data;
    this.genMonthData();
  }
  @Input()
  set year(data: number) {
    this._yearNumber = data;
    this.genMonthData();
  }

  constructor(private calendarService: FsCalendarService) {}

  ngOnInit() {
    this.genMonthData();
    this.isLoading = false;
  }

  genMonthData() {
    this.currentMonth = this.calendarService.newgenerateMonth(
      this._monthNumber,
      this._yearNumber,
      []
    );
  }

  matchMonthData(customData: CalendarExtendedDay[]): CalendarExtendedDay[] {
    let result: CalendarExtendedDay[] = [];
    this.currentMonth?.days.forEach((dayInMonth) => {
      let index = customData.findIndex((day) => {
        return dateFns.isSameDay(day.date, dayInMonth.date);
      });

      if (index == -1) {
        result.push(dayInMonth);
      } else {
        let tmpDay = dayInMonth;
        tmpDay.toolTip = customData[index].toolTip;
        result.push({
          date: dayInMonth.date,
          toolTip: customData[index].toolTip,
          colors: customData[index].colors,
          char: customData[index].char,
        });
      }
    });
    return result;
  }

  onMonthForward() {
    if (this._monthNumber >= 11) {
      this._yearNumber++;
      this._monthNumber = 0;
    } else {
      this._monthNumber++;
    }
    this.genMonthData();
  }

  onMonthBackward() {
    if (this._monthNumber <= 0) {
      this._yearNumber--;
      this._monthNumber = 11;
    } else {
      this._monthNumber--;
    }
    this.genMonthData();
  }

  isToday(date: Date): boolean {
    return dateFns.isSameDay(new Date(), date);
  }
}
