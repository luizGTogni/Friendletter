import moment from 'moment';
import 'moment/locale/pt-br';

export const getAge = (date: string): number => {
  if (!moment(date, 'YYYYMDD').isValid()) {
    throw new Error('It is not date valid');
  }
  return moment().diff(date, 'years');
};

export const generateYears = (backTime: number): Array<string> => {
  const years = [];
  const dateStart = moment();
  const dateEnd = moment().subtract(backTime, 'y');

  while (dateEnd.diff(dateStart, 'years') <= 0) {
    years.push(dateStart.format('YYYY'));
    dateStart.subtract(1, 'year');
  }

  return years;
};

export const generateMonths = (): Array<string> => {
  const months = [];
  const dateStart = moment(1, 'MM');
  const dateEnd = moment().add(11, 'month');

  while (dateEnd.diff(dateStart, 'months') > 0) {
    months.push(dateStart.format('MMMM'));
    dateStart.add(1, 'month');
  }
  return months;
};

export const generateDays = (): Array<string> => {
  const days = [];
  for (let day = 1; day <= 31; day += 1) {
    days.push(`0${day}`.slice(-2));
  }

  return days;
};
