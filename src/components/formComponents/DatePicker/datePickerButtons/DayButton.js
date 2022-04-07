import { useEffect, useState } from "react";

export const DayButton = ({setActiveDay, isActiveDay, toggleButtonClass, selectedDay, dayListOptions }) => {

    const [borderClass, setBorderClass] = useState('')

    useEffect(() => {
        setBorderClass('dropdown-btn')
    }, [])

    useEffect(() => {
        if (isActiveDay) {
            setBorderClass('dropdown-btn dropdown-btn-active')
        } else {
            setBorderClass('dropdown-btn')
        }
    }, [isActiveDay])

    return (
        <div className="dropdown">

            <div data-testid="dayButton" aria-label="chooseDayButton" tabIndex="0" id="dayButton" className={borderClass} onClick={e => {
                setActiveDay(!isActiveDay)
                toggleButtonClass("dayButton")}}>
                {selectedDay}
            </div>

            <span className="svg-arrow"></span>

            {isActiveDay && (
            <div className="dropdown-content">
                {dayListOptions}
            </div>
            )}
        </div>
    );
};