import { Component, Input, Output } from '@angular/core';
import { CalendarConfig, Day, calendarSelected } from 'projects/ng-mat-components/src/public-api';

@Component({
  selector: 'storybook-fs-calender',
  template: `
  <div style="height: 80%;">
  <fs-calendar [placeholderDay]="placeholder" [dataSource]="dataSource" [year]="2022" [month]="3"
    [monthsBefore]="monthsBefore" [monthsAfter]="monthsAfter" [config]="calendarConfig"
    (selectedDate)="testMethod($event)">
  </fs-calendar>
  </div>`,
  //styleUrls: ['../projects/lib-workspace/src/styles.scss']
})
export default class StoryFsCalendarComponent {
  @Input()
  placeholder: boolean = false // boolean

  @Input()
  monthsBefore: number = 2;
  @Input()
  monthsAfter: number = 0;

  @Input()
  calendarConfig: CalendarConfig = {
    renderMode: 'monthly', // 'annual' | 'monthly'
    selectMode: 'range',  // 'click' | 'range'
    displayYear: true,
    firstDayOfWeekMonday: true,
    calendarWeek: false,
    switches: true,
    panelWidth: '300px',
    bluredDays: false, // default: false
    markWeekend: true // default: true
  }

  @Input()
  dataSource: Day[] = [
    {
      date: new Date(1634594400000),
      backgroundColor: '#0167c7',
      toolTip: 'Test ToolTip First',
      dayNumber: ''
    },
    {
      date: new Date(1634594400000),
      backgroundColor: 'rgb(6, 182, 0)',
      toolTip: 'Test ToolTip Second',
      dayNumber: ''
    },
    {
      date: new Date(1634853600000),
      backgroundColor: 'rgb(6, 182, 0)',
      toolTip: 'Test ToolTip 2',
      dayNumber: ''
    },
    {
      date: new Date(1635544800000),
      backgroundColor: 'lightblue',
      dayNumber: ''
    }
  ]

  @Output()
  testMethod(event: calendarSelected) {
    let range
    switch (event.type) {
      case "range":
        range = event;
        break;
      case "date":
        range = event;
        break;
    }
    console.log(event)
  }
}
