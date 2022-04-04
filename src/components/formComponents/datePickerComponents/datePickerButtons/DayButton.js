export const DayButton = ({setActiveDay, isActiveDay, toggleButtonClass, selectedDay, dayListOptionsNew}) => {

    return (
        <div data-testid="dayButton" className='dropdown'>

            <div id='dayButton' className="dropdown-btn" onClick={e => {
                setActiveDay(!isActiveDay)
                toggleButtonClass('dayButton')}}>
                {selectedDay}
            </div>

            <span className='svg-arrow'></span>

            {isActiveDay && (
            <div className="dropdown-content">
                {dayListOptionsNew}
            </div>
            )}
        </div>
    )
}