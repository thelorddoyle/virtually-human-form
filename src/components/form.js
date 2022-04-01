import { useEffect, useState } from "react"

function Form () {
    
    // date-based constants
    const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const dayOptionsMin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
    const dayOptionsMean = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    const dayOptionsMax = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]

    const yearOptions = [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980]

    const getNumOfMonth = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12
    }

    const getMonthFromNum = {
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
    }

    const chooseDayListArg = (month) => {
        if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
            setDayList(dayOptionsMax);
        } else if (month !== 'August') {
            setDayList(dayOptionsMean)
        } else {
            setDayList(dayOptionsMin)
        }
    }

    let defaultValues = {
        firstName: 'Daniel',
        lastName: 'Lord-Doyle',
        email: 'dlorddoyle@gmail.com',
        phone: '0451087593',
        dob: new Date(1988, 9, 14),
        bio: 'lorem ipsum lorem ipsum'
    }

    // state variables
    const [values, setValues] = useState({...defaultValues})
    const [day, setDay] = useState(values.dob.getDate())
    const [month, setMonth] = useState(getMonthFromNum[values.dob.getMonth()])
    const [year, setYear] = useState(values.dob.getFullYear())
    const [dayList, setDayList] = useState([])

    useEffect(() => {
        try {
            chooseDayListArg(month)
        } catch(err) {
            console.log(err)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
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

    const handleMonthChange = (ev) => {
        const month = ev.target.value;
        const monthToSubmit = getNumOfMonth[month] -1;
        chooseDayListArg(ev.target.value);
        setMonth(monthToSubmit);
        console.log('the month is now: ', month)
    }

    const handleDayChange = (ev) => {
        const day = Number(ev.target.value);
        setDay(day)
        console.log('the day is now: ', day)
    }
    
    const handleYearChange = (ev) => {
        const year = Number(ev.target.value);
        setYear(year)
        console.log('the year is now: ', year)
    }

    const onChange = (ev) => {
        setValues({...values, [ev.target.name]: ev.target.value})
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        try {
            console.log(values)
        } catch (err) {
            console.log(err)
        }
    }

    const discardChanges = () => {

        setValues(defaultValues);
        chooseDayListArg(month)
        setDay(Number(14))
        setMonth('October')
        setYear(Number(1988))

    }

    return(
        <div>
            <h1>Settings</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="firstName">First Name
                <input type="text" name='firstName' value={values.firstName} onChange={onChange} />
                </label>
                <br />
                <label htmlFor="lastName">Last Name
                <input value={values.lastName} onChange={onChange} name='lastName' type="text"  />
                </label>
                <br />
                <label htmlFor="email">Email
                <input onChange={onChange} name='email' type="text" value={values.email} />
                </label>
                <br />
                <label htmlFor="phone">Phone
                <input onChange={onChange} name='phone' type="text" value={values.phone} />
                </label>
                <br />
                <label htmlFor="selectYourDateOfBirth">Select Your Date Of Birth 
                <br />
                    <label> Month
                        <select onChange={handleMonthChange} name="month" id="monthPicker" value={month}>
                        {monthListOptions}
                        </select>
                    </label> 
                    <label> Day
                        <select onChange={handleDayChange} name="day" id="dayPicker" value={day} >
                        {dayListOptions}
                        </select>
                    </label>
                    <label> Year
                        <select onChange={handleYearChange} name="year" id="yearPicker" value={year}>
                        {yearListOptions}
                        </select>  

                    </label>
                </label>
                <br />
                <label htmlFor="bio"> Bio
                <br />
                    <textarea onChange={onChange} name="bio" value={values.bio} />
                </label>
                <br />
                <button type="submit">Save Changes</button>
                <button onClick={discardChanges}>Discard Changes</button>
            </form>
        </div>
    )
}

export default Form;