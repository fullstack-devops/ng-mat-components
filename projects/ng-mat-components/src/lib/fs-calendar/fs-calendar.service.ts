import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import * as moment_ from 'moment';
import 'moment/min/locales';
import { Calendar, Month, Day } from './calendar.models';

export const moment = moment_;

@Injectable({
  providedIn: 'root',
})
export class FsCalendarService {
  constructor(@Inject(LOCALE_ID) private appLocale: string) {
    moment.locale(this.appLocale.substring(0, 2));
  }

  monthNames = moment.monthsShort();
  dayNames = moment.weekdaysShort();
  dayNamesEn = moment.weekdaysShort();
  dayNamesDeVor = JSON.parse(JSON.stringify(this.dayNamesEn));
  dayNamesDe = this.dayNamesDeVor.push(this.dayNamesDeVor.shift());

  dataSourceCustom: Day[] = [];
  daysAbsolute: Date[] = [];

  /**
   * @param {String}     mode             calendar mode (monthly|annual)
   * @param {boolean}    calendarWeek     Display calendar week
   * @param {DayCustom}  dataSource       Custom dates, Model 'DayCustom'
   * @param {Number}     year             Gerarate calender for one year
   * @param {Number}     currMonth        current selected month
   * @param {Number}     monthsBefore     months before the selected month, default 0
   * @param {Number}     monthsAfter      months after the selected month, default 0
   */
  generateMatrix(
    mode: string,
    calendarWeek: boolean,
    dataSource: Day[],
    year: number,
    currMonth: number,
    monthsBefore: number,
    monthsAfter: number
  ): Calendar {
    let cal: Calendar;
    this.dataSourceCustom = dataSource;
    this.daysAbsolute = [];

    monthsAfter = monthsAfter
      ? parseInt(monthsAfter.toString(), 10)
      : monthsAfter;
    monthsBefore = monthsBefore
      ? parseInt(monthsBefore.toString(), 10)
      : monthsBefore;
    currMonth = currMonth ? parseInt(currMonth.toString(), 10) : currMonth;
    // Standard calendar
    if (mode === 'monthly') {
      const months: Month[] = [];
      months.push(this.generateMonth(currMonth, year));
      for (let index = 0; index < monthsBefore; index++) {
        const calculatedMonth = currMonth - monthsBefore + index;
        const actualYear = calculatedMonth + 1 < 1 ? year - 1 : year;
        const actualMonth =
          calculatedMonth + 1 < 1 ? 12 + calculatedMonth : calculatedMonth;
        months.splice(index, 0, this.generateMonth(actualMonth, actualYear));
      }
      for (let index = 0; index < monthsAfter; index++) {
        const calculatedMonth = currMonth + index + 1;
        const actualYear = calculatedMonth > 11 ? year + 1 : year;
        const actualMonth =
          calculatedMonth > 11 ? calculatedMonth - 12 : calculatedMonth;
        months.push(this.generateMonth(actualMonth, actualYear));
      }
      cal = {
        months: months,
        dayNames: this.dayNamesDeVor,
        year: year,
        daysAbsolute: this.daysAbsolute,
      };
    } else {
      // Calendar is a full year
      cal = this.generateCal(year);
    }

    cal.months.forEach((month: { days: any[] }, index: any) => {
      month.days.forEach((day) => {
        Object.assign(day, { type: 'date' });
      });
      let render: Day[] = month.days;
      const firstMonthDay = month.days[0];
      let currMonth = moment(month.days[0].date);
      const dayOfWeek = currMonth.day() == 0 ? 7 : currMonth.day();
      const nextMonth = moment(currMonth.add(1, 'M'));
      const nextMonthDay: Day = this.generateDay(nextMonth);
      // Vormonat
      for (let i = 0; i < dayOfWeek - 1; i++) {
        render.splice(
          i,
          0,
          this.makeWJObjekt(firstMonthDay, 'placeholderDay', dayOfWeek - 1 - i)
        );
      }
      // Nachmonat
      for (let i = 0; render.length < 42; i--) {
        render.splice(
          render.length + 1,
          0,
          this.makeWJObjekt(nextMonthDay, 'placeholderDay', i)
        );
      }
      // Kalenderwochen && tr rows
      let renderTr = [];
      if (calendarWeek) {
        render.splice(0, 0, this.makeWJObjekt(render[0], 'kw'));
        render.splice(8, 0, this.makeWJObjekt(render[8], 'kw'));
        render.splice(16, 0, this.makeWJObjekt(render[16], 'kw'));
        render.splice(24, 0, this.makeWJObjekt(render[24], 'kw'));
        render.splice(32, 0, this.makeWJObjekt(render[32], 'kw'));
        render.splice(40, 0, this.makeWJObjekt(render[40], 'kw'));
        renderTr.push(render.slice(0, 8));
        renderTr.push(render.slice(8, 16));
        renderTr.push(render.slice(16, 24));
        renderTr.push(render.slice(24, 32));
        renderTr.push(render.slice(32, 40));
        renderTr.push(render.slice(40, 48));
      } else {
        renderTr.push(render.slice(0, 7));
        renderTr.push(render.slice(7, 14));
        renderTr.push(render.slice(14, 21));
        renderTr.push(render.slice(21, 28));
        renderTr.push(render.slice(28, 35));
        renderTr.push(render.slice(35, 42));
      }

      Object.assign(month, { render: renderTr });
      cal.daysAbsolute = this.daysAbsolute;
      // month.days = []
    });
    return cal;
  }

  makeWJObjekt(day: Day, type: string, dateBack?: number): Day {
    let newDay: Day;
    let newMDate: moment.Moment;
    if (dateBack) {
      newMDate = moment(day.date).subtract(dateBack, 'days');
    } else {
      newMDate = moment(day.date);
    }
    switch (type) {
      case 'kw':
        newDay = {
          dayNumber: '',
          date: newMDate.toDate(),
          kw: day.kw,
          type: 'kw',
        };
        break;
      case 'placeholderDay':
        newDay = {
          dayNumber: newMDate.format('D'),
          date: newMDate.toDate(),
          kw: newMDate.week(),
          type: 'placeholderDay',
          isWeekendDay: this.isWeekend(newMDate),
        };
        break;
      default:
        newDay = {
          dayNumber: newMDate.format('D'),
          date: newMDate.toDate(),
          kw: day.kw,
          type: 'not-set',
        };
    }
    return newDay;
  }

  generateCal(year: number): Calendar {
    const months = [];
    for (let index = 0; index < this.monthNames.length; index++) {
      months.push(this.generateMonth(index, year));
    }
    return {
      year: year,
      dayNames: this.dayNames,
      months: months,
      daysAbsolute: this.daysAbsolute,
    };
  }

  generateMonth(monthNumber: number, year: number): Month {
    const monthDay = moment(`${year}-${monthNumber + 1}`, 'YYYY-MM');
    const daysInMonth = monthDay.daysInMonth();
    const days: Day[] = [];
    for (let index = 0; index < daysInMonth; index++) {
      const currentDay = new Date(year, monthNumber, index + 1);
      days.push(this.generateDay(moment(currentDay)));
    }
    return {
      name: this.monthNames[monthNumber],
      year: year,
      days: days,
      render: [[]],
    };
  }

  generateDay(currentDay: moment.Moment): Day {
    let tmpDay = this.dataSourceCustom;
    let day: Day;

    if (tmpDay != null) {
      // Filter nach vorhandenem override
      const filter = tmpDay.filter((obj) => {
        return currentDay.isSame(obj.date, 'day');
      });
      if (filter.length > 0) {
        let backgroundColor = '';
        let toolTip = '';
        switch (filter.length) {
          case 2:
            backgroundColor = `linear-gradient(110deg, ${filter[0].backgroundColor} 49%, ${filter[1].backgroundColor} 51%)`;
            toolTip = `${filter[0].toolTip} \n ${filter[1].toolTip}`;
            break;
          case 3:
            backgroundColor = `linear-gradient(110deg,
                ${filter[0].backgroundColor}, ${filter[0].backgroundColor} 31%,
                ${filter[1].backgroundColor} 32%, ${filter[1].backgroundColor} 65%,
                ${filter[2].backgroundColor} 66%)`;
            toolTip = `${filter[0].toolTip} \n ${filter[1].toolTip} \n ${filter[2].toolTip}`;
            break;
          case 4:
            backgroundColor = `linear-gradient(110deg,
              ${filter[0].backgroundColor}, ${filter[0].backgroundColor} 24%,
              ${filter[1].backgroundColor} 26%, ${filter[1].backgroundColor} 49%,
              ${filter[2].backgroundColor} 51%, ${filter[2].backgroundColor} 74%,
              ${filter[3].backgroundColor} 76%)`;
            toolTip = `${filter[0].toolTip} \n ${filter[1].toolTip} \n ${filter[2].toolTip} \n ${filter[3].toolTip}`;
            break;
          default:
            if (filter[0].backgroundColor) {
              backgroundColor = filter[0].backgroundColor;
            }
            if (filter[0].toolTip) {
              toolTip = filter[0].toolTip;
            }
            break;
        }
        day = filter[0];
        day.backgroundColor = backgroundColor;
        day.toolTip = toolTip;
        day['kw'] = currentDay.week();
        day.date = currentDay.toDate();
        day.dayNumber = currentDay.format('D');
        day['isWeekendDay'] = this.isWeekend(currentDay);
      } else {
        day = {
          kw: currentDay.week(),
          dayNumber: currentDay.format('D'),
          date: currentDay.toDate(),
          isWeekendDay: this.isWeekend(currentDay),
        };
      }
    } else {
      day = {
        kw: currentDay.week(),
        dayNumber: currentDay.format('D'),
        date: currentDay.toDate(),
        isWeekendDay: this.isWeekend(currentDay),
      };
    }
    this.daysAbsolute.push(currentDay.toDate());
    return day;
  }

  isWeekend(date: moment.Moment): boolean {
    return parseInt(date.format('E'), 0) > 5;
  }
}
