import { render, screen } from '@testing-library/react';
import { noErrorsAllowed } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import Form from '../../Form';

// allows me to call this function and render form in all it blocks
const setupTest = () => {render(<Form />);};

// ensures that no console errors occur in any of my it blocks or throw error in test
noErrorsAllowed();

describe('The DOB datepicker input', () => {

    let user, monthButton, dayButton, discardButton, yearButton;

    beforeEach(() => {
        setupTest();
        user = userEvent.setup();
        monthButton = screen.getByTestId('monthButton');
        discardButton = screen.getByRole('button', { name: /discard/i });
        yearButton = screen.getByTestId('yearButton');
        dayButton = screen.getByTestId('dayButton');
    });

    it('will save a new month in the dropdown when a user chooses a different month', async () => {
        
        await user.click(monthButton);
        expect(monthButton).toHaveClass('dropdown-btn dropdown-btn-active');

        const differentMonth = screen.getByText(/april/i);
        await user.click(differentMonth);
        expect(monthButton).toHaveTextContent(/april/i);
        
    });

    it('will reset the month if I press the discard button', async () => {
        
        await user.click(monthButton);

        const differentMonth = screen.getByText(/april/i);
        await user.click(differentMonth);
        expect(monthButton).toHaveTextContent(/april/i);

        await user.click(discardButton);
        expect(monthButton).toHaveTextContent(/october/i);
    });

    it('will save a new day in the dropdown when a user chooses a different day', async () => {
        
        await user.click(dayButton);
        expect(dayButton).toHaveClass('dropdown-btn dropdown-btn-active');

        const differentDay = screen.getByText(/18/i);
        await user.click(differentDay);
        expect(dayButton).toHaveTextContent(/18/i);
        
    });

    it('will reset the day if I press the discard button', async () => {
        
        await user.click(dayButton);
        
        const differentDay = screen.getByText(/18/i);
        await user.click(differentDay);
        expect(dayButton).toHaveTextContent(/18/i);

        await user.click(discardButton);
        expect(dayButton).toHaveTextContent(/14/i);
    });

    it('will correctly render 29 days in February if it is a leap year', async () => {

        // choose February as a month
        await user.click(monthButton);
        const differentMonth = screen.getByText(/february/i);
        await user.click(differentMonth);
        expect(monthButton).toHaveTextContent(/february/i);

        // choose 2020 as a year (which was a leap year)
        await user.click(yearButton);
        const leapYear = screen.getByText(/2020/i);
        await user.click(leapYear);
        expect(yearButton).toHaveTextContent(/2020/i);

        // try to get the 29th day in February which is only available on a leap year
        await user.click(dayButton);
        const theleapday = screen.getByText(/29/i);
        await user.click(theleapday);
        expect(dayButton).toHaveTextContent(/29/i);
    });

    it('will save a new year in the dropdown when a user chooses a different day', async () => {
        
        await user.click(yearButton);
        expect(yearButton).toHaveClass('dropdown-btn dropdown-btn-active');

        const differentYear = screen.getByText(/2010/i);
        await user.click(differentYear);
        expect(yearButton).toHaveTextContent(/2010/i); 
    });

    it('will reset the year if I press the discard button', async () => {
        
        await user.click(yearButton);
        const differentYear = screen.getByText(/2010/i);
        await user.click(differentYear);
        expect(yearButton).toHaveTextContent(/2010/i);

        await user.click(discardButton);
        expect(yearButton).toHaveTextContent(/1988/i);
    });
});