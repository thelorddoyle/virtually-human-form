import { render, screen } from '@testing-library/react';
import { noErrorsAllowed } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import Form from '../../Form';

// allows me to call this function and render form in all it blocks
const setupTest = () => {render(<Form />);};

// ensures that no console errors occur in any of my it blocks or throw error in test
noErrorsAllowed();

describe('The last name field input', () => {

    let user, lastNameInput, discardButton, anywhereElseOnScreen, lastNameInputErrorMessage;

    beforeEach(() => {
        setupTest();
        user = userEvent.setup();   
        lastNameInput = screen.getByRole('textbox', {  name: /lastnameinput/i});
        discardButton = screen.getByRole('button', { name: /discard/i });
        anywhereElseOnScreen = screen.getByRole('textbox', {  name: /phoneinput/i});
        lastNameInputErrorMessage = screen.getByTestId('lastNameErrorMessage');
    });

    it('will save a new name in the field when a user types in the input', async () => {
        const newName = 'Test 1';
        
        expect(lastNameInput).toHaveDisplayValue('Lord-Doyle');
        await user.clear(lastNameInput);
        await user.type(lastNameInput, newName);
        expect(lastNameInput).toHaveValue(newName);
    });

    it('will discard all of the users changes if the user presses the discard button', async () => {
        const newName = 'Test 2';

        await user.clear(lastNameInput);
        await user.type(lastNameInput, newName);
        expect(lastNameInput).toHaveValue(newName);

        await user.click(discardButton);
        expect(lastNameInput).toHaveValue('Lord-Doyle');
    });

    it('will tell the user the field is required if the user does not put a value in the last name text area', async () => {        
        await user.clear(lastNameInput);
        await user.click(anywhereElseOnScreen);
        expect(lastNameInput).toBeEmptyDOMElement();
        expect(lastNameInputErrorMessage).toHaveTextContent('This field is required');
    });

    it('will tell the user that they have typed in an invalid name if the name does not meet the name validator conditions', async () => {
        const invalidName = '123456';

        await user.clear(lastNameInput);
        await user.type(lastNameInput, invalidName);
        await user.click(anywhereElseOnScreen);
        expect(lastNameInputErrorMessage).toHaveTextContent('This is an invalid name');
    });

    it('will tell the user that they should check for spaces if there is a space char at the beginning or end of the name if they have rogue space characters there', async () => {
        const invalidName = '  test for space  ';

        await user.clear(lastNameInput);
        await user.type(lastNameInput, invalidName);
        await user.click(anywhereElseOnScreen);
        expect(lastNameInputErrorMessage).toHaveTextContent('Field cannot begin or end with space character');
    })

    it('will tell the user that they cannot only use space characters in a name if they have done that', async () => {
        const invalidName = '   ';

        await user.clear(lastNameInput);
        await user.type(lastNameInput, invalidName);
        await user.click(anywhereElseOnScreen);
        expect(lastNameInputErrorMessage).toHaveTextContent('Field cannot contain only spaces');
    });

    it('will highlight the field if there is an error', async () => {        
        await user.clear(lastNameInput);
        await user.click(anywhereElseOnScreen);
        expect(lastNameInput).toHaveClass('error-field');
    })
});