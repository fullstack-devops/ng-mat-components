import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import * as dateFns_ from 'date-fns';
import { Calendar, Day, Month } from './calendar.models';

export const dateFns = dateFns_;

@Injectable({
  providedIn: 'root',
})
export class FsCalendarService {
  dayNamesDeVor: any;
  dayNamesDe: any;

  dataSourceCustom: Day[] = [];
  daysAbsolute: Date[] = [];

  constructor(@Inject(LOCALE_ID) private appLocale: string) {}

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
    mode: 'monthly' | 'annual',
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
      let firstDayOfMonth = month.days[0].date;
      let dayOfWeek = dateFns.getDay(firstDayOfMonth);
      let nextMonth = dateFns.addMonths(firstDayOfMonth, 1);
      // Vormonat
      for (let i = 0; i < dayOfWeek - 1; i++) {
        render.splice(
          0,
          0,
          this.makeWJObjekt(
            dateFns.subDays(firstDayOfMonth, i + 1),
            'placeholderDay'
          )
        );
      }
      // Nachmonat
      for (let i = 0; render.length < 42; i++) {
        render.splice(
          render.length,
          0,
          this.makeWJObjekt(dateFns.addDays(nextMonth, i), 'placeholderDay')
        );
      }
      // Kalenderwochen && tr rows
      let renderTr = [];
      if (calendarWeek) {
        render.splice(0, 0, this.makeWJObjekt(render[0].date, 'kw'));
        render.splice(8, 0, this.makeWJObjekt(render[8].date, 'kw'));
        render.splice(16, 0, this.makeWJObjekt(render[16].date, 'kw'));
        render.splice(24, 0, this.makeWJObjekt(render[24].date, 'kw'));
        render.splice(32, 0, this.makeWJObjekt(render[32].date, 'kw'));
        render.splice(40, 0, this.makeWJObjekt(render[40].date, 'kw'));
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

  makeWJObjekt(date: Date, type: 'kw' | 'placeholderDay'): Day {
    let newDay: Day;
    switch (type) {
      case 'kw':
        newDay = {
          dayNumber: '',
          date: date,
          kw: dateFns.getWeek(date, { weekStartsOn: 4 }),
          type: 'kw',
        };
        break;
      case 'placeholderDay':
        newDay = {
          dayNumber: dateFns.format(date, 'd'),
          date: date,
          kw: dateFns.getWeek(date, { weekStartsOn: 4 }),
          type: 'placeholderDay',
          isWeekendDay: dateFns.isWeekend(date),
        };
        break;
    }
    return newDay;
  }

  generateCal(year: number): Calendar {
    const months = [];
    for (let index = 0; index < 12; index++) {
      months.push(this.generateMonth(index, year));
    }
    return {
      year: year,
      dayNames: [],
      months: months,
      daysAbsolute: this.daysAbsolute,
    };
  }

  generateMonth(monthNumber: number, year: number): Month {
    const firstDayInMonth = new Date(year, monthNumber, 1);
    const daysInMonth = dateFns.getDaysInMonth(firstDayInMonth);

    const days: Day[] = [];
    for (let index = 0; index < daysInMonth; index++) {
      const date = new Date(year, monthNumber, index + 1);
      days.push(this.generateDay(date));
    }

    return {
      name: dateFns.format(days[0].date, 'LLLL'),
      year: year,
      days: days,
      render: [[]],
    };
  }

  generateDay(dateToGenerate: Date): Day {
    let tmpDay = this.dataSourceCustom;
    let day: Day;

    if (tmpDay != null) {
      // Filter nach vorhandenem override
      const filter = tmpDay.filter((obj) => {
        return dateFns.isSameDay(dateToGenerate, obj.date);
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
        day['kw'] = dateFns.getWeek(dateToGenerate);
        day.date = dateToGenerate;
        day.dayNumber = dateFns.format(dateToGenerate, 'd');
        day['isWeekendDay'] = dateFns.isWeekend(dateToGenerate);
      } else {
        day = {
          kw: dateFns.getWeek(dateToGenerate),
          dayNumber: dateFns.format(dateToGenerate, 'd'),
          date: dateToGenerate,
          isWeekendDay: dateFns.isWeekend(dateToGenerate),
        };
      }
    } else {
      day = {
        kw: dateFns.getWeek(dateToGenerate),
        dayNumber: dateFns.format(dateToGenerate, 'd'),
        date: dateToGenerate,
        isWeekendDay: dateFns.isWeekend(dateToGenerate),
      };
    }
    this.daysAbsolute.push(dateToGenerate);
    return day;
  }
}
