import { useEffect, useState } from "react"

import { monthOptions, dayOptionsMin, dayOptionsMean, dayOptionsMax, yearOptions, getNumOfMonth, getMonthFromNum } from '../helpers/datepicker'

function Form () {

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
        const month = getNumOfMonth[ev.target.value];
        setMonth(month)
        chooseDayListArg(getMonthFromNum[month])
        console.log('the month is now: ', getMonthFromNum[month])
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
            // console.log(month)
            // console.log()
            let valuesDob = values.dob = new Date(year, month, day)
            setValues({...values, dob: valuesDob})
            console.log(values)
        } catch (err) {
            console.log(err)
        }
    }

    const discardChanges = () => {

        setValues(defaultValues);
        setDay(defaultValues.dob.getDate())
        setMonth(defaultValues.dob.getMonth())
        setYear(defaultValues.dob.getFullYear())
        chooseDayListArg(month)

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
                        <select onChange={handleMonthChange} name="month" id="monthPicker" value={getMonthFromNum[month]}>
                        {monthListOptions}
                        </select>
                    </label> 
                    <label> Day
                        <select onChange={handleDayChange} name="day" id="dayPicker" value={day}>
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