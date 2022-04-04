    // date-based export constants
    export const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    export const checkLeapYear = (year) => {
        //three conditions to find out the leap year
        return ((0 === year % 4) && ((0 !== year % 100) || (0 === year % 400)))
    }

    export const shortestMonth = [1, 2, 3, 4, 5, 6, 7, 
                                  8, 9, 10, 11, 12, 13, 14, 
                                  15, 16, 17, 18, 19, 20, 21, 
                                  22, 23, 24, 25, 26, 27, 28];

    export const leapYear = [1, 2, 3, 4, 5, 6, 7, 
                             8, 9, 10, 11, 12, 13, 14, 
                             15, 16, 17, 18, 19, 20, 21, 
                             22, 23, 24, 25, 26, 27, 28,
                             29];                                  

    export const mediumMonth = [1, 2, 3, 4, 5, 6, 7, 
                                8, 9, 10, 11, 12, 13, 14, 
                                15, 16, 17, 18, 19, 20, 21, 
                                22, 23, 24, 25, 26, 27, 28, 
                                29, 30];

    export const longestMonth = [1,2,3,4,5,6,7,
                                 8,9,10,11,12,13,14,
                                 15,16,17,18,19,20,21,
                                 22,23,24,25,26,27,28,
                                 29,30,31];

    export const yearList = [
        2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 
        2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 
        2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 
        1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 
        1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 
        1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 
        1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 
        1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943];

    export const getNumOfMonth = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
    };

    export const getMonthFromNum = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    };

    export const chooseDayListArg = (month, year, setDayList) => {
        if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
            setDayList(mediumMonth);
        } else if (month === 'February') {
            if (checkLeapYear(year)) {
                setDayList(leapYear)
            } else {
                setDayList(shortestMonth)
            }
        } else if (month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' || month === 'October' || month === 'December') {
            setDayList(longestMonth)
        }
    };

    export const toggleButtonClass = (divId) => {
        if (document.getElementById(divId)) {
            let myDiv = document.getElementById(divId).className
            if (myDiv === 'dropdown-btn') {
                document.getElementById(divId).classList.add('dropdown-btn-active')
                // document.getElementById(divId).classList.remove('dropdown-btn')
            } else if (myDiv === 'dropdown-btn dropdown-btn-active') {
                document.getElementById(divId).classList.remove('dropdown-btn-active')
                document.getElementById(divId).style = ''
            }
        } 
    }

    export const changeButtonBorder = (divId) => {
        document.getElementById(divId).style.border = 'solid 1px green'
    }