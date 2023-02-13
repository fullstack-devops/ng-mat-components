import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarPanels } from 'projects/ng-mat-components/src/public-api';

@Component({
  selector: 'app-showcase-calendar-panels',
  templateUrl: './showcase-calendar-panels.component.html',
  styleUrls: ['./showcase-calendar-panels.component.css'],
})
export class ShowcaseCalendarPanelsComponent implements OnInit {
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

  // monthsBefore = new FormControl(1);
  // monthsAfter = new FormControl(1);

  dataSource: CalendarPanels = {
    config: {
      renderMode: 'monthly', // 'annual' | 'monthly'
      selectMode: 'range', // 'click' | 'range'
      displayYear: true,
      firstDayOfWeekMonday: true,
      calendarWeek: true,
      switches: true,
      panelWidth: '300px',
      bluredDays: false, // default: false
      markWeekend: true, // default: true
    },
    data: [
      {
        date: new Date(this.today.getFullYear(), this.today.getMonth(), 3),
        colors: {
          backgroundColor: '#0167c7',
        },
        toolTip: 'Test ToolTip First',
      },
      {
        date: new Date(this.today.getFullYear(), this.today.getMonth(), 3),
        colors: {
          backgroundColor: 'rgb(6, 182, 0)',
        },
        toolTip: 'Test ToolTip Second',
      },
      {
        date: new Date(this.today.getFullYear(), this.today.getMonth(), 12),
        colors: {
          backgroundColor: 'rgb(6, 182, 0)',
        },
        toolTip: 'Test ToolTip 2',
      },
      {
        date: new Date(this.today.getFullYear(), this.today.getMonth(), 25),
        colors: {
          backgroundColor: 'lightblue',
        },
      },
    ],
  };

  constructor() {}
  ngOnInit(): void {
    console.log(this.dataSource);
    this.isLoading = false;
  }

  testMethod(event: CalendarEvent) {
    switch (event.type) {
      case 'range':
        this.range = event;
        break;
      case 'click':
        this.range = event;
        break;
    }
    console.log(event);
  }
}
