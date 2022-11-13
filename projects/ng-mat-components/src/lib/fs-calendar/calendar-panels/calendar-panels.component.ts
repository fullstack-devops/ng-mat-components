import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import * as dateFns from 'date-fns';
import {
  Calendar,
  CalendarEvent,
  CalendarExtendedDay,
  CalendarPanels,
} from '../calendar.models';
import { FsCalendarService } from '../services/fs-calendar.service';

@Component({
  selector: 'fs-calendar-panels',
  templateUrl: './calendar-panels.component.html',
  styleUrls: ['./calendar-panels.component.scss'],
  host: {
    class: 'fs-calendar-panels',
  },
})
export class FsCalendarPanelsComponent implements OnInit {
  private _dataSource: CalendarPanels = {
    config: {
      renderMode: 'monthly',
      selectMode: 'click',
      displayYear: true,
      firstDayOfWeekMonday: true,
      calendarWeek: false,
      switches: true,
      bluredDays: false,
      markWeekend: true,
      panelWidth: '350px',
    },
    data: [],
  };

  private _month = new Date().getUTCMonth();
  private _year: number = new Date().getFullYear();
  private _monthsBefore: number = 0;
  private _monthsAfter: number = 0;

  calendar: Calendar = new Calendar();
  today = new Date();
  selectedDayStart: Date | undefined;
  selectedDayBetween: Date[] = [];
  selectedDayEnd: Date | undefined;
  markWeekend = this._dataSource.config.markWeekend;
  bluredDays = this._dataSource.config.bluredDays;
  isLoading = true;
  monthOverrride = false;

  weekendColor = 'rgba(0, 0, 0, .25)';

  get dataSource(): CalendarPanels {
    return this._dataSource;
  }
  get month(): number {
    return this._month;
  }
  get year(): number {
    return this._year;
  }
  get monthsBefore(): number {
    return this._monthsBefore;
  }
  get monthsAfter(): number {
    return this._monthsAfter;
  }

  @Input()
  set dataSource(data: CalendarPanels) {
    this._dataSource = data;
    this.generateCal();
  }
  @Input()
  set month(data: number) {
    this._month = data;
    this.monthOverrride = false;
    this.generateCal();
  }
  @Input()
  set year(data: number) {
    this._year = data;
    this.generateCal();
  }
  @Input()
  set monthsBefore(data: number) {
    this._monthsBefore = data;
    this.generateCal();
  }
  @Input()
  set monthsAfter(data: number) {
    this._monthsAfter = data;
    this.generateCal();
  }
  @Input() placeholderDay: boolean = false;

  @Output() readonly selection = new EventEmitter<CalendarEvent>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.selectedDayBetween = [];
      this.selectedDayStart = undefined;
      this.selectedDayEnd = undefined;
    }
  }

  constructor(private calendarService: FsCalendarService) {}

  ngOnInit() {
    this.isLoading = false;
  }

  onClick(day: CalendarExtendedDay, type: string) {
    if (type === 'date' && this._dataSource.config.selectMode === 'range') {
      if (
        this.selectedDayStart != undefined &&
        this.selectedDayEnd != undefined
      ) {
        this.selectedDayBetween = [];
        this.selectedDayStart = undefined;
        this.selectedDayEnd = undefined;
      }
      if (
        dateFns.isBefore(day.date, this.selectedDayStart as Date) ||
        this.selectedDayStart === undefined
      ) {
        this.selectedDayStart = day.date;
      } else {
        this.selectedDayEnd = day.date;
        this.selection.emit({
          type: 'range',
          start: this.selectedDayStart,
          end: this.selectedDayEnd,
        });
      }
    } else {
      this.selection.emit({
        type: 'click',
        date: day.date,
      });
    }
  }

  onMouseOver(dateComp: Date) {
    if (
      this.selectedDayStart != undefined &&
      this.selectedDayEnd == undefined
    ) {
      console.log(this.selectedDayStart, dateComp);
      this.selectedDayBetween = this.calendar.daysAbsolute.filter((date) => {
        return (
          dateFns.isAfter(date, this.selectedDayStart as Date) &&
          dateFns.isBefore(date, dateComp)
        );
      });
    }
  }

  getAmIBetween(date: Date): boolean {
    const fIndex = this.selectedDayBetween.findIndex((selDate) => {
      return dateFns.isSameDay(selDate, date);
    });
    if (fIndex != -1) {
      return true;
    } else {
      return false;
    }
  }

  isSelectedDayStart(date: Date): boolean {
    if (this.selectedDayStart) {
      return dateFns.isSameDay(this.selectedDayStart, date);
    } else {
      return false;
    }
  }
  isSelectedDayEnd(date: Date): boolean {
    if (this.selectedDayEnd) {
      return dateFns.isSameDay(this.selectedDayEnd, date);
    } else {
      if (this.selectedDayBetween.length > 0) {
        if (
          dateFns.isSameDay(
            dateFns.addDays(
              this.selectedDayBetween[this.selectedDayBetween.length - 1],
              1
            ),
            date
          )
        ) {
          return true;
        }
      }
      return false;
    }
  }

  isToday(date: Date): boolean {
    return dateFns.isSameDay(new Date(), date);
  }

  getCanIBeHighlighted(date: Date) {
    if (this.selectedDayEnd) {
      if (
        (!dateFns.isSameDay(this.selectedDayStart as Date, date) &&
          !dateFns.isSameDay(this.selectedDayEnd, date) &&
          this.getAmIBetween(date)) ||
        (dateFns.isSameDay(this.selectedDayEnd, date) &&
          this.selectedDayEnd != undefined) ||
        (dateFns.isSameDay(this.selectedDayStart as Date, date) &&
          this.selectedDayStart != undefined)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onMonthForward() {
    this.monthOverrride = true;
    if (this.month >= 11 || this._month >= 11) {
      this._year = parseInt(this.year.toString(), 10) + 1;
      this._month = 0;
    } else {
      this._month = parseInt(this._month.toString(), 10) + 1;
    }
    this.generateCal();
  }

  onMonthBackward() {
    this.monthOverrride = true;
    if (this.month <= 0 || this._month <= 0) {
      this._year = parseInt(this.year.toString(), 10) - 1;
      this._month = 11;
    } else {
      this._month = parseInt(this._month.toString(), 10) - 1;
    }
    this.generateCal();
  }

  private generateCal() {
    const usedYear = this.monthOverrride ? this._year : this.year;
    const usedMonth = this.monthOverrride ? this._month : this.month;
    this.calendar = this.calendarService.generateMatrix(
      this._dataSource.config.renderMode,
      this._dataSource.config.calendarWeek,
      this.dataSource.data,
      usedYear,
      usedMonth,
      this.monthsBefore,
      this.monthsAfter
    );
  }
}
