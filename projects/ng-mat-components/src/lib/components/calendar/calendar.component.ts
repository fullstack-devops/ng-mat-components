import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { CalendarConfig, Day, Calendar, calendarSelected } from '../../modules/calendar';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'fs-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  host: {
    'class': 'fs-calendar',
  },
})
export class FsCalendarComponent implements OnInit {

  private _config: CalendarConfig = {
    renderMode: 'monthly',
    selectMode: 'click',
    displayYear: true,
    firstDayOfWeekMonday: true,
    calendarWeek: false,
    switches: true,
    bluredDays: false,
    markWeekend: true,
    panelWidth: '350px'
  };
  private _mode: string = '';
  private _dataSource: Day[] = [];
  private _month = new Date().getUTCMonth();
  private _year: number = new Date().getFullYear()
  private _monthsBefore: number = 0;
  private _monthsAfter: number = 0;

  calendar: Calendar = new Calendar()
  today = new Date()
  selectedDayStart: Date | undefined
  selectedDayBetween: Date[] = []
  selectedDayEnd: Date | undefined
  markWeekend = this._config.markWeekend
  bluredDays = this._config.bluredDays
  isLoading = true
  monthOverrride = false

  weekendColor = 'rgba(0, 0, 0, .25)'

  get config(): CalendarConfig {
    return this._config;
  }
  get mode(): string {
    return this._mode;
  }
  get dataSource(): Day[] {
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
  set dataSource(data: Day[]) {
    this._dataSource = data;
    this.generateX()
  }
  @Input()
  set mode(val: string) {
    this._mode = val;
    this.generateX()
  }
  @Input()
  set month(data: number) {
    this._month = data;
    this.monthOverrride = false
    this.generateX()
  }
  @Input()
  set config(data: CalendarConfig) {
    this._config = data;
    this.markWeekend = data.markWeekend
    this.bluredDays = data.bluredDays
    this.generateX()
  }
  @Input()
  set year(data: number) {
    this._year = data;
    this.generateX()
  }
  @Input()
  set monthsBefore(data: number) {
    this._monthsBefore = data;
    this.generateX()
  }
  @Input()
  set monthsAfter(data: number) {
    this._monthsAfter = data;
    this.generateX()
  }
  @Input() placeholderDay: boolean = false;

  @Output() readonly selectedDate = new EventEmitter<calendarSelected>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.selectedDayBetween = []
      this.selectedDayStart = undefined
      this.selectedDayEnd = undefined
    }
  }

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.isLoading = false
  }

  onClick(day: Day, type: string) {
    if (type === 'date' && this.config.selectMode === 'range') {
      if (this.selectedDayStart != undefined && this.selectedDayEnd != undefined) {
        this.selectedDayBetween = []
        this.selectedDayStart = undefined
        this.selectedDayEnd = undefined
      }
      if (moment(day.date).isBefore(this.selectedDayStart, 'day') || this.selectedDayStart === undefined) {
        this.selectedDayStart = day.date
      } else {
        this.selectedDayEnd = day.date
        this.selectedDate.emit({
          type: "range",
          start: this.selectedDayStart,
          end: this.selectedDayEnd,
        });
      }
    } else {
      this.selectedDate.emit({
        type: "date",
        date: day.date
      });
    }
  }

  onMouseOver(dateComp: Date) {
    if (this.selectedDayStart != undefined && this.selectedDayEnd == undefined) {
      this.selectedDayBetween = this.calendar.daysAbsolute.filter(date => {
        return moment(date).isBetween(this.selectedDayStart, dateComp, 'day')
      })
    }
  }

  getAmIBetween(date: Date): boolean {
    const fIndex = this.selectedDayBetween.findIndex(selDate => {
      return moment(selDate).isSame(date, 'day')
    })
    if (fIndex != -1) {
      return true
    } else {
      return false
    }
  }

  isSelectedDayStart(date: Date): boolean {
    if (this.selectedDayStart) {
      return moment(this.selectedDayStart).isSame(date, 'day')
    } else {
      return false
    }
  }
  isSelectedDayEnd(date: Date): boolean {
    if (this.selectedDayEnd) {
      return moment(this.selectedDayEnd).isSame(date, 'day')
    } else {
      if (this.selectedDayBetween.length > 0) {
        if (moment(this.selectedDayBetween[this.selectedDayBetween.length - 1]).add(1, 'd').isSame(date, 'day')) {
          return true
        }
      }
      return false
    }
  }
  isToday(date: Date): boolean {
    return moment().isSame(date, 'day')
  }

  getCanIBeHighlighted(date: Date) {
    if (this.selectedDayEnd) {
      if (!moment(this.selectedDayStart).isSame(date, 'day') && !moment(this.selectedDayEnd).isSame(date, 'day') && this.getAmIBetween(date)
        || (moment(this.selectedDayEnd).isSame(date, 'day') && this.selectedDayEnd != undefined)
        || (moment(this.selectedDayStart).isSame(date, 'day') && this.selectedDayStart != undefined)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  onMonthForward() {
    this.monthOverrride = true
    if (this.month >= 11 || this._month >= 11) {
      this._year = parseInt(this.year.toString(), 10) + 1
      this._month = 0
    } else {
      this._month = parseInt(this._month.toString(), 10) + 1
    }
    this.generateX()
  }

  onMonthBackward() {
    this.monthOverrride = true
    if (this.month <= 0 || this._month <= 0) {
      this._year = parseInt(this.year.toString(), 10) - 1
      this._month = 11
    } else {
      this._month = parseInt(this._month.toString(), 10) - 1
    }
    this.generateX()
  }

  generateX() {
    const usedYear = this.monthOverrride ? this._year : this.year
    const usedMonth = this.monthOverrride ? this._month : this.month
    this.calendar = this.calendarService.generateMatrix(
      this.config.renderMode,
      this.config.calendarWeek,
      this.dataSource,
      usedYear,
      usedMonth,
      this.monthsBefore,
      this.monthsAfter)
  }

}
