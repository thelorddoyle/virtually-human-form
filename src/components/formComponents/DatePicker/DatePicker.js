import { monthList, yearList, getNumOfMonth, getMonthFromNum } from '../../../helpers/datePicker/datePickerHelpers'
import { chooseDayList } from '../../../helpers/datePicker/chooseDayList'
import { toggleButtonClass } from '../../../helpers/datePicker/toggleButtonClass'
import { changeButtonBorder } from '../../../helpers/datePicker/changeButtonBorder'

import { MonthButton } from './datePickerButtons/MonthButton'
import { DayButton } from './datePickerButtons/DayButton'
import { YearButton } from './datePickerButtons/YearButton'

import { useEffect, useState } from "react"

export const DatePicker = ({values, convertDate}) => {

    const [isActiveMonth, setActiveMonth] = useState(false);
    const [isActiveDay, setActiveDay] = useState(false);
    const [isActiveYear, setActiveYear] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [dayList, setDayList] = useState([]);

    useEffect(() => {
        chooseDayList(selectedMonth, selectedYear, setDayList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMonth]);

    useEffect(() => {
        setSelectedMonth(getMonthFromNum[values.dob.getMonth()]);
        setSelectedDay(values.dob.getDate());
        setSelectedYear(values.dob.getFullYear());
    }, [values]);

    useEffect(() => {

        window.addEventListener('click', function(e){   
            if (e.target.className !== 'dropdown-item' && e.target.id !== 'monthButton' && e.target.id !== 'yearButton' && e.target.id !== 'dayButton') {
                setActiveMonth(false)
                setActiveYear(false)
                setActiveDay(false)
            }
        });

        return () => {
            window.removeEventListener('click', function(e){   
                if (e.target.className !== 'dropdown-item' && e.target.id !== 'monthButton' && e.target.id !== 'yearButton' && e.target.id !== 'dayButton') {
                    setActiveMonth(false)
                    setActiveYear(false)
                    setActiveDay(false)
                }
            });
        }
    }, [])

    let monthListOptions = monthList.map((month) => {
        // each month is a string, not a number
        return (
            <div key={month} className='dropdown-item' onClick={(e) => {
                setSelectedMonth(month);
                setActiveMonth(false);
                chooseDayList(month, selectedYear, setDayList);
                changeButtonBorder('monthButton');
                toggleButtonClass('monthButton');
                convertDate(Number(selectedDay), Number(getNumOfMonth[month]), Number(selectedYear));}}> 
                {month} 
            </div>
        );
    });

    // map out all options for a Day selector, based on which month it is (dayList)
    let dayListOptions = dayList.map((day) => {
        return (
            <div key={day} className='dropdown-item' onClick={(e) => {
                setSelectedDay(day);
                setActiveDay(false);
                changeButtonBorder('dayButton');
                toggleButtonClass('dayButton');
                convertDate(Number(day), Number(getNumOfMonth[selectedMonth]), Number(selectedYear));}}>
                {day} 
            </div>
        );
    });

    let yearListOptions = yearList.map((year) => {
        return (
            <div key={year} className='dropdown-item' onClick={(e) => {
                setSelectedYear(year);
                setActiveYear(false);
                changeButtonBorder('yearButton');
                toggleButtonClass('yearButton');
                convertDate(Number(selectedDay), Number(getNumOfMonth[selectedMonth]), Number(year));}}>
                {year}
            </div>
        );
    });

    return(
        <label htmlFor="selectYourDateOfBirth">SELECT YOUR DATE OF BIRTH* 

        <div className='inline-grid'>

        <MonthButton setActiveMonth={setActiveMonth} 
                        isActiveMonth={isActiveMonth} 
                        toggleButtonClass={toggleButtonClass} 
                        selectedMonth={selectedMonth} 
                        monthListOptions={monthListOptions} />

        <DayButton setActiveDay={setActiveDay} 
                    isActiveDay={isActiveDay} 
                    toggleButtonClass={toggleButtonClass} 
                    selectedDay={selectedDay} 
                    dayListOptions={dayListOptions}/>

        <YearButton setActiveYear={setActiveYear} 
                    isActiveYear={isActiveYear}
                    toggleButtonClass={toggleButtonClass}
                    selectedYear={selectedYear}
                    yearListOptions={yearListOptions}/>

        </div>
            
        </label>
    );
};