export const YearButton = ({setActiveYear, isActiveYear, toggleButtonClass, selectedYear, yearListOptions}) => {

    return (
        <div data-testid="yearButton" className='dropdown'>

            <div id='yearButton' className="dropdown-btn" onClick={e => {
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
    )
}