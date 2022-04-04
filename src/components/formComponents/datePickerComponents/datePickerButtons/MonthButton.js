export const MonthButton = ({setActiveMonth, isActiveMonth, toggleButtonClass, selectedMonth, monthListOptionsNew}) => {

    return (
        <div data-testid="monthButton" className='dropdown'>

            <div id='monthButton' className="dropdown-btn" onClick={e => {
                setActiveMonth(!isActiveMonth)
                toggleButtonClass('monthButton')}}>
                {selectedMonth}
            </div>

                <span className='svg-arrow'></span>

                {isActiveMonth && (
                <div className="dropdown-content">
                    {monthListOptionsNew}
                </div>
                )}
        </div>
    )
}