import { Inject, Injectable } from '@angular/core';
import * as dateFns from 'date-fns';
import { CalendarExtendedDay, CalendarMonth, CalendarPanel, CalendarPanelSum } from '../calendar.models';

@Injectable({
  providedIn: 'root',
})
export class FsCalendarService {
  dayNames: string[] = this.getWeekDayNames();
  oneYearOfMonths: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  constructor(@Inject('FS_DATE_LOCALE') private appLocale: dateFns.Locale) {}

  generateMatrix(
    mode: 'monthly' | 'annual',
    calendarWeek: boolean,
    customDays: CalendarExtendedDay[],
    year: number,
    currMonth: number,
    monthsBefore: number,
    monthsAfter: number
  ): CalendarPanelSum {
    let cal: CalendarPanelSum;

    monthsAfter = monthsAfter ? parseInt(monthsAfter.toString(), 10) : monthsAfter;
    monthsBefore = monthsBefore ? parseInt(monthsBefore.toString(), 10) : monthsBefore;
    currMonth = currMonth ? parseInt(currMonth.toString(), 10) : currMonth;

    // Standard calendar
    if (mode === 'monthly') {
      let calendarPanels: CalendarPanel[] = [];
      for (let index = 0; index < monthsBefore; index++) {
        const calculatedMonth = currMonth - monthsBefore + index;
        const actualYear = calculatedMonth + 1 < 1 ? year - 1 : year;
        const actualMonth = calculatedMonth + 1 < 1 ? 12 + calculatedMonth : calculatedMonth;
        calendarPanels.push(this.generatePanel(actualYear, actualMonth, calendarWeek, customDays));
      }
      calendarPanels.push(this.generatePanel(year, currMonth, calendarWeek, customDays));
      for (let index = 0; index < monthsAfter; index++) {
        const calculatedMonth = currMonth + index + 1;
        const actualYear = calculatedMonth > 11 ? year + 1 : year;
        const actualMonth = calculatedMonth > 11 ? calculatedMonth - 12 : calculatedMonth;
        calendarPanels.push(this.generatePanel(actualYear, actualMonth, calendarWeek, customDays));
      }

      let daysAbsolute: Date[] = [];
      calendarPanels.forEach(panel => {
        panel.days.forEach(day => {
          daysAbsolute.push(day.date);
        });
      });
      cal = {
        year: year,
        dayNames: this.dayNames,
        daysAbsolute: daysAbsolute,
        calendarPanels: calendarPanels,
      };
    } else {
      // Calendar is a full year
      let calendarPanels = this.generatePanels(year, this.oneYearOfMonths, calendarWeek, customDays);
      let daysAbsolute: Date[] = [];
      calendarPanels.forEach(panel => {
        panel.days.forEach(day => {
          daysAbsolute.push(day.date);
        });
      });
      cal = {
        year: year,
        dayNames: this.dayNames,
        daysAbsolute: daysAbsolute,
        calendarPanels: calendarPanels,
      };
    }
    return cal;
  }

  generatePanels(year: number, months: number[], calendarWeek: boolean, customDays: CalendarExtendedDay[]): CalendarPanel[] {
    let tmpPanels: CalendarPanel[] = [];
    months.forEach(month => {
      tmpPanels.push(this.generatePanel(year, month, calendarWeek, customDays));
    });
    return tmpPanels;
  }

  generatePanel(year: number, month: number, calendarWeek: boolean, customDays: CalendarExtendedDay[]): CalendarPanel {
    const filtedCustomDays = customDays.filter(day => {
      return dateFns.isSameMonth(new Date(year, month, 1), day.date);
    });
    let tmpMonth = this.generateMonth(year, month, filtedCustomDays);
    let tmpMonthRenderer: CalendarPanel = {
      year: year,
      month: month,
      monthName: tmpMonth.name,
      days: tmpMonth.days,
      render: [[]],
    };
    let tmpPreRender: CalendarExtendedDay[] = tmpMonth.days;
    let firstDayOfMonth = tmpMonth.days[0].date;
    let dayOfWeek = dateFns.getISODay(firstDayOfMonth);
    let nextMonth = dateFns.addMonths(firstDayOfMonth, 1);
    // previous month
    for (let i = 0; i < dayOfWeek - 1; i++) {
      tmpPreRender.splice(0, 0, this.generatePlaceholder(dateFns.subDays(firstDayOfMonth, i + 1)));
    }
    // post month
    for (let i = 0; tmpPreRender.length < 42; i++) {
      tmpPreRender.splice(tmpPreRender.length, 0, this.generatePlaceholder(dateFns.addDays(nextMonth, i)));
    }
    // CalendarWeekDays && tr rows
    if (calendarWeek) {
      tmpPreRender.splice(0, 0, this.generateWeekNumber(tmpPreRender[0].date));
      tmpPreRender.splice(8, 0, this.generateWeekNumber(tmpPreRender[8].date));
      tmpPreRender.splice(16, 0, this.generateWeekNumber(tmpPreRender[16].date));
      tmpPreRender.splice(24, 0, this.generateWeekNumber(tmpPreRender[24].date));
      tmpPreRender.splice(32, 0, this.generateWeekNumber(tmpPreRender[32].date));
      tmpPreRender.splice(40, 0, this.generateWeekNumber(tmpPreRender[40].date));
      tmpMonthRenderer.render.push(tmpPreRender.slice(0, 8));
      tmpMonthRenderer.render.push(tmpPreRender.slice(8, 16));
      tmpMonthRenderer.render.push(tmpPreRender.slice(16, 24));
      tmpMonthRenderer.render.push(tmpPreRender.slice(24, 32));
      tmpMonthRenderer.render.push(tmpPreRender.slice(32, 40));
      tmpMonthRenderer.render.push(tmpPreRender.slice(40, 48));
    } else {
      tmpMonthRenderer.render.push(tmpPreRender.slice(0, 7));
      tmpMonthRenderer.render.push(tmpPreRender.slice(7, 14));
      tmpMonthRenderer.render.push(tmpPreRender.slice(14, 21));
      tmpMonthRenderer.render.push(tmpPreRender.slice(21, 28));
      tmpMonthRenderer.render.push(tmpPreRender.slice(28, 35));
      tmpMonthRenderer.render.push(tmpPreRender.slice(35, 42));
    }
    return tmpMonthRenderer;
  }

  generatePlaceholder(date: Date): CalendarExtendedDay {
    return {
      date: date,
      _meta: {
        kw: dateFns.getWeek(date, { weekStartsOn: 4 }),
        type: 'plHolder',
        dayNumber: dateFns.format(date, 'd', {
          locale: this.appLocale,
        }),
        isWeekendDay: dateFns.isWeekend(date),
      },
    };
  }

  generateWeekNumber(date: Date): CalendarExtendedDay {
    return {
      date: date,
      _meta: {
        kw: dateFns.getWeek(date, { weekStartsOn: 4 }),
        type: 'cw',
        dayNumber: dateFns.format(date, 'd', {
          locale: this.appLocale,
        }),
        isWeekendDay: dateFns.isWeekend(date),
      },
    };
  }

  generateMonth(year: number, month: number, customDays: CalendarExtendedDay[]): CalendarMonth {
    const firstDayInMonth = new Date(year, month, 1);
    const daysInMonth = dateFns.getDaysInMonth(firstDayInMonth);
    const days: CalendarExtendedDay[] = [];

    for (let index = 0; index < daysInMonth; index++) {
      const date = new Date(year, month, index + 1);
      const filtedCustomDays = customDays.filter(day => {
        return dateFns.isSameDay(date, day.date);
      });
      days.push(this.generateDay(date, filtedCustomDays));
    }

    return {
      name: dateFns.format(days[0].date, 'MMMM', { locale: this.appLocale }),
      year: year,
      days: days,
    };
  }

  generateDay(dateToGenerate: Date, customDays: CalendarExtendedDay[]): CalendarExtendedDay {
    if (customDays.length == 0) {
      return {
        date: dateToGenerate,
        _meta: {
          kw: dateFns.getWeek(dateToGenerate, { weekStartsOn: 4 }),
          type: 'day',
          dayNumber: dateFns.format(dateToGenerate, 'd', {
            locale: this.appLocale,
          }),
          isWeekendDay: dateFns.isWeekend(dateToGenerate),
        },
      };
    } else {
      let backgroundColor = '';
      let toolTip = '';
      switch (customDays.length) {
        case 2:
          backgroundColor = `linear-gradient(110deg, ${customDays[0].colors?.backgroundColor} 49%, ${customDays[1].colors?.backgroundColor} 51%)`;
          toolTip = `<li>${customDays[0].toolTip}</li><li>${customDays[1].toolTip}</li>`;
          break;
        case 3:
          backgroundColor = `linear-gradient(110deg,
                ${customDays[0].colors?.backgroundColor}, ${customDays[0].colors?.backgroundColor} 31%,
                ${customDays[1].colors?.backgroundColor} 32%, ${customDays[1].colors?.backgroundColor} 65%,
                ${customDays[2].colors?.backgroundColor} 66%)`;
          toolTip = `${customDays[0].toolTip} <br> ${customDays[1].toolTip} <br> ${customDays[2].toolTip}`;
          break;
        case 4:
          backgroundColor = `linear-gradient(110deg,
              ${customDays[0].colors?.backgroundColor}, ${customDays[0].colors?.backgroundColor} 24%,
              ${customDays[1].colors?.backgroundColor} 26%, ${customDays[1].colors?.backgroundColor} 49%,
              ${customDays[2].colors?.backgroundColor} 51%, ${customDays[2].colors?.backgroundColor} 74%,
              ${customDays[3].colors?.backgroundColor} 76%)`;
          toolTip = `${customDays[0].toolTip} <br> ${customDays[1].toolTip} <br> ${customDays[2].toolTip} <br> ${customDays[3].toolTip}`;
          break;
        default:
          if (customDays[0].colors?.backgroundColor) {
            backgroundColor = customDays[0].colors?.backgroundColor;
          }
          if (customDays[0].toolTip) {
            toolTip = customDays[0].toolTip;
          }
          break;
      }
      return {
        date: dateToGenerate,
        badge: customDays[0].badge,
        char: customDays[0].char,
        colors: {
          backgroundColor: backgroundColor,
          color: customDays[0].colors?.color,
        },
        toolTip: toolTip,
        _meta: {
          kw: dateFns.getWeek(dateToGenerate, { weekStartsOn: 4 }),
          type: 'day',
          dayNumber: dateFns.format(dateToGenerate, 'd', {
            locale: this.appLocale,
          }),
          isWeekendDay: dateFns.isWeekend(dateToGenerate),
        },
      };
    }
  }

  getWeekDayNames(): string[] {
    let now = new Date();
    let arr = dateFns.eachDayOfInterval({
      start: dateFns.startOfWeek(now, { weekStartsOn: 1 }),
      end: dateFns.endOfWeek(now, { weekStartsOn: 1 }),
    });
    let arrOfDays: string[] = [];
    arr.map(a => arrOfDays.push(dateFns.format(a, 'EEEEEE', { locale: this.appLocale })));
    return arrOfDays;
  }
}
