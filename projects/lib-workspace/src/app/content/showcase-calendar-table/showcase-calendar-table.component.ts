import { Component, OnInit } from '@angular/core';
import { CalendarTableEntry } from 'projects/ng-mat-components/src/public-api';

@Component({
  selector: 'app-showcase-calendar-table',
  templateUrl: './showcase-calendar-table.component.html',
  styleUrls: ['./showcase-calendar-table.component.css'],
})
export class ShowcaseCalendarTableComponent implements OnInit {
  today = new Date();

  calTableData: CalendarTableEntry[] = [
    {
      name: 'Test User',
      data: [
        {
          date: new Date(this.today.getFullYear(), this.today.getMonth(), 20),
          toolTip: 'Some longer text',
          char: '',
          colors: {
            backgroundColor: '#FFFFFF',
            color: '#000',
          },
        },
      ],
    },
    {
      name: 'Test User 2',
      data: [
        {
          date: new Date(this.today.getFullYear(), this.today.getMonth(), 3),
          toolTip: 'Some text',
          char: 'T',
          colors: {
            backgroundColor: '#FFFFFF',
            color: '#000',
          },
        },
        {
          date: new Date(this.today.getFullYear(), this.today.getMonth(), 10),
          toolTip: 'Some text',
          char: 'U',
          colors: {
            backgroundColor: '#22ff0e',
            color: '#000',
          },
        },
      ],
    },
    {
      name: 'Test User 3',
      data: [],
    },
    {
      name: 'Test User 4',
      data: [],
    },
    {
      name: 'Test User 5',
      data: [],
    },
    {
      name: 'Test User 6',
      data: [],
    },
    {
      name: 'Test User 7',
      data: [],
    },
    {
      name: 'Test User 8',
      data: [],
    },
    {
      name: 'Test User 9',
      data: [],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
