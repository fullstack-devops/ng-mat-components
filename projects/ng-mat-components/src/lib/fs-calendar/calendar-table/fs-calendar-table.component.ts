import { Component, Input, OnInit } from '@angular/core';
import * as dateFns from 'date-fns';
import { CalendarExtendedDay, CalendarTable, Month } from '../calendar.models';
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

  currentMonth: Month | undefined;
  tableData: CalendarTable | undefined;

  private _monthNumber: number = dateFns.getMonth(new Date());
  private _yearNumber: number = dateFns.getYear(new Date());

  @Input()
  set dataSource(data: CalendarTable) {
    this.tableData = data;
    // this.generateX();
  }

  @Input()
  set month(data: number) {
    this._monthNumber = data;
    // this.generateX();
  }
  @Input()
  set year(data: number) {
    this._yearNumber = data;
    // this.generateX();
  }

  constructor(private calendarService: FsCalendarService) {}

  ngOnInit() {
    this.genMonthData();
    console.log(this.tableData);
    this.isLoading = false;
  }

  genMonthData() {
    this.currentMonth = this.calendarService.generateMonth(
      this._monthNumber,
      this._yearNumber
    );
  }

  matchMonthData(customData: CalendarExtendedDay[]): CalendarExtendedDay[] {
    let result: CalendarExtendedDay[] = [];
    this.currentMonth?.days.forEach((dayInMonth) => {
      let index = customData.findIndex((obj) => {
        return dateFns.isSameDay(obj.date, dayInMonth.date);
      });

      if (index == -1) {
        result.push({
          date: dayInMonth.date,
        });
      } else {
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
