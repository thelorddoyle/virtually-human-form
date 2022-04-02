import { monthOptions, dayOptionsMin, dayOptionsMean, dayOptionsMax, yearOptions, getNumOfMonth, getMonthFromNum } from '../helpers/datePickerHelpers'

import { useEffect, useState } from "react"

export const DatePicker = ({values, convertDate}) => {

    const chooseDayListArg = (month) => {
        if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
            setDayList(dayOptionsMax);
        } else if (month !== 'August') {
            setDayList(dayOptionsMean)
        } else {
            setDayList(dayOptionsMin)
        }
    }

    const [month, setMonth] = useState(values.dob.getMonth())
    const [year, setYear] = useState(values.dob.getFullYear())
    const [day, setDay] = useState(values.dob.getDate())
    const [dayList, setDayList] = useState([])

    useEffect(() => {
        try {
            chooseDayListArg(month)
        } catch(err) {
            console.log(err)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setMonth(values.dob.getMonth());
        setDay(values.dob.getDate());
        setYear(values.dob.getFullYear());
    }, [values])
    
    // map out all options for a Month selector
    let monthListOptions = monthOptions.map((month) => {
        // each month is a string, not a number
        return (
            <option key={month} value={`${month}`}>{month} </option>
        )
    })

    // map out all options for a Day selector, based on which month it is (dayList)
    let dayListOptions = dayList.map((day) => {
        return (
            <option key={day} value={`${day}`}>{day} </option>
        )
    })

    let yearListOptions = yearOptions.map((year) => {
        return(
            <option key={year} value={`${year}`}>{year}</option>
        )
    })

    const handleDateChange = (ev) => {
        if (ev.target.name === 'day') {
            const day = Number(ev.target.value);
            setDay(day)
            convertDate(day, month, year)
        } else if (ev.target.name === 'month') {
            const month = getNumOfMonth[ev.target.value];
            setMonth(month)
            chooseDayListArg(getMonthFromNum[month])
            convertDate(day, month, year)
        } else if (ev.target.name === 'year') {
            const year = Number(ev.target.value);
            setYear(year)
            convertDate(day, month, year)
        }
    }

    return(
        <label htmlFor="selectYourDateOfBirth">SELECT YOUR DATE OF BIRTH* 

            <div>
                <select onChange={handleDateChange} name="month" id="monthPicker" value={getMonthFromNum[month]}>
                {monthListOptions}
                </select>

                <select onChange={handleDateChange} name="day" id="dayPicker" value={day}>
                {dayListOptions}
                </select>

                <select onChange={handleDateChange} name="year" id="yearPicker" value={year}>
                {yearListOptions}
                </select>  
            </div>
            
        </label>
    )
}