import { useEffect, useState } from "react";

export const YearButton = ({setActiveYear, isActiveYear, toggleButtonClass, selectedYear, yearListOptions}) => {

    const [borderClass, setBorderClass] = useState('')

    useEffect(() => {
        setBorderClass('dropdown-btn')
    }, [])

    useEffect(() => {
        if (isActiveYear) {
            setBorderClass('dropdown-btn dropdown-btn-active')
        } else {
            setBorderClass('dropdown-btn')
        }
    }, [isActiveYear])

    return (
        <div className='dropdown'>

            <div data-testid="yearButton" aria-label="chooseYearButton" tabIndex="0" id='yearButton' className={borderClass} onClick={e => {
                setActiveYear(!isActiveYear)
                toggleButtonClass('yearButton')}}>
                {selectedYear}
            </div>

            <span className='svg-arrow'></span>

            {isActiveYear && (
            <div className="dropdown-content">
                {yearListOptions}
            </div>
            )}
        </div>
    );
};