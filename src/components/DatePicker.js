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

    const [isActiveMonth, setActiveMonth] = useState(false)
    const [isActiveDay, setActiveDay] = useState(false)
    const [isActiveYear, setActiveYear] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedDay, setSelectedDay] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const [dayList, setDayList] = useState([])

    useEffect(() => {
        try {
            chooseDayListArg(selectedMonth)
        } catch(err) {
            console.log(err)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setSelectedMonth(getMonthFromNum[values.dob.getMonth()]);
        setSelectedDay(values.dob.getDate());
        setSelectedYear(values.dob.getFullYear());
    }, [values])

    let monthListOptionsNew = monthOptions.map((month) => {
        // each month is a string, not a number
        return (
            <div key={month} className='dropdown-item' onClick={(e) => {
                setSelectedMonth(month)
                setActiveMonth(false)
                chooseDayListArg(month)
                convertDate(Number(selectedDay), Number(getNumOfMonth[month]), Number(selectedYear))}}> 
                {month} 
            </div>
        )
    })

    // map out all options for a Day selector, based on which month it is (dayList)
    let dayListOptionsNew = dayList.map((day) => {
        return (
            <div key={day} className='dropdown-item' onClick={(e) => {
                setSelectedDay(day)
                setActiveDay(false)
                convertDate(Number(day), Number(getNumOfMonth[selectedMonth]), Number(selectedYear))}}>
                {day} 
            </div>
        )
    })

    let yearListOptionsNew = yearOptions.map((year) => {
        return (
            <div key={year} className='dropdown-item' onClick={(e) => {
                setSelectedYear(year)
                setActiveYear(false)
                convertDate(Number(selectedDay), Number(getNumOfMonth[selectedMonth]), Number(year))}}>
                {year} 
            </div>
        )
    })

    return(
        <label htmlFor="selectYourDateOfBirth">SELECT YOUR DATE OF BIRTH* 

        <div className='inline-grid'>

            <div className='dropdown'>
                <div className="dropdown-btn" onClick={e => setActiveMonth(!isActiveMonth)}>
                    {selectedMonth}
                </div>
                    <span className='svg-arrow'></span>
                    {isActiveMonth && (
                    <div className="dropdown-content">
                        {monthListOptionsNew}
                    </div>
                    )}
            </div>

            <div className='dropdown'>
                <div className="dropdown-btn" onClick={e => setActiveDay(!isActiveDay)}>
                    {selectedDay}
                </div>
                    <span className='svg-arrow'></span>
                    {isActiveDay && (
                    <div className="dropdown-content">
                        {dayListOptionsNew}
                    </div>
                    )}
            </div>

            <div className='dropdown'>
                <div className="dropdown-btn" onClick={e => setActiveYear(!isActiveYear)}>
                    {selectedYear}
                </div>
                    <span className='svg-arrow'></span>
                    {isActiveYear && (
                    <div className="dropdown-content">
                        {yearListOptionsNew}
                    </div>
                    )}
            </div>

        </div>
            
        </label>
    )
}