import { Component, OnInit } from '@angular/core';
import {
  CalendarConfig,
  calendarSelected,
  Day,
} from 'projects/ng-mat-components/src/public-api';

@Component({
  selector: 'lib-calender-showcase',
  templateUrl: './calender-showcase.component.html',
  styleUrls: ['./calender-showcase.component.scss'],
})
export class CalenderShowcaseComponent implements OnInit {
  docsApi = './assets/docs/calendar/api.md';
  range: any;

  placeholder = false; // boolean
  isLoading = true;
  latestEvent: Object | undefined;

  today = new Date();
  todayMonth = this.today.getMonth();
  todayYear = this.today.getFullYear();

  monthsAfterBefore = Array(5)
    .fill(0)
    .map((x, i) => i);
  monthsBefore = 1;
  monthsAfter = 1;

  calendarConfig: CalendarConfig = {
    renderMode: 'monthly', // 'annual' | 'monthly'
    selectMode: 'range', // 'click' | 'range'
    displayYear: true,
    firstDayOfWeekMonday: true,
    calendarWeek: true,
    switches: true,
    panelWidth: '300px',
    bluredDays: false, // default: false
    markWeekend: true, // default: true
  };

  dataSource: Day[] = [
    {
      date: new Date(1634594400000),
      backgroundColor: '#0167c7',
      toolTip: 'Test ToolTip First',
      dayNumber: '',
    },
    {
      date: new Date(1634594400000),
      backgroundColor: 'rgb(6, 182, 0)',
      toolTip: 'Test ToolTip Second',
      dayNumber: '',
    },
    {
      date: new Date(1634853600000),
      backgroundColor: 'rgb(6, 182, 0)',
      toolTip: 'Test ToolTip 2',
      dayNumber: '',
    },
    {
      date: new Date(1635544800000),
      backgroundColor: 'lightblue',
      dayNumber: '',
    },
  ];

  constructor() {}
  ngOnInit(): void {
    console.log(this.dataSource);
    this.isLoading = false;
  }

  testMethod(event: calendarSelected) {
    switch (event.type) {
      case 'range':
        this.range = event;
        break;
      case 'date':
        this.range = event;
        break;
    }
    console.log(event);
  }
}
