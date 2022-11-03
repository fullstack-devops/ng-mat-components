import { Component, OnInit } from '@angular/core';
import { CalendarTable } from 'projects/ng-mat-components/src/public-api';

@Component({
  selector: 'lib-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.css'],
})
export class CalendarTableComponent implements OnInit {
  today = new Date();

  calTableData: CalendarTable = {
    nameCol: 'Persons',
    entries: [
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User',
        data: [],
      },
      {
        name: 'Test User 2',
        data: [
          {
            date: this.today,
            toolTip: 'Test',
            char: 'T',
            colors: {
              backgroundColor: '#FFFFFF',
              color: '#000',
            },
          },
        ],
      },
    ],
  };
  constructor() {}

  ngOnInit() {}
}
