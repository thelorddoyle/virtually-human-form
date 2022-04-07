import { useEffect, useState } from 'react';

export const MonthButton = ({setActiveMonth, isActiveMonth, toggleButtonClass, selectedMonth, monthListOptions}) => {

    const [borderClass, setBorderClass] = useState('')

    useEffect(() => {
        setBorderClass('dropdown-btn')
    }, [])

    useEffect(() => {
        if (isActiveMonth) {
            setBorderClass('dropdown-btn dropdown-btn-active')
        } else {
            setBorderClass('dropdown-btn')
        }
    }, [isActiveMonth])

    return (
        <div className="dropdown">

            <div data-testid="monthButton" aria-label="chooseMonthButton" tabIndex="0" id="monthButton" className={borderClass} onClick={e => {
                setActiveMonth(!isActiveMonth)
                toggleButtonClass("monthButton")}}>
                {selectedMonth}
            </div>

            <span className="svg-arrow"></span>

            {isActiveMonth && (
            <div id="dropdown-content" className="dropdown-content">
                {monthListOptions}
            </div>
            )}
        </div>
    );
};