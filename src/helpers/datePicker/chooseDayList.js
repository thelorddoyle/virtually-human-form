import { mediumMonth, leapYear, shortestMonth, longestMonth, checkLeapYear } from './datePickerHelpers';

export const chooseDayList = (month, year, setDayList) => {
    if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
        setDayList(mediumMonth);
    } else if (month === 'February') {
        if (checkLeapYear(year)) {
            setDayList(leapYear);
        } else {
            setDayList(shortestMonth);
        }
    } else if (month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' || month === 'October' || month === 'December') {
        setDayList(longestMonth);
    };
};