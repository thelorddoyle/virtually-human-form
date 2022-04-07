import { render, screen } from '@testing-library/react';
import { noErrorsAllowed } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import Form from '../../Form';

const setupTest = () => {render(<Form />);};

noErrorsAllowed();

describe('The first name field input', () => {

    let user, firstNameInput, discardButton, anywhereElseOnScreen, firstNameInputErrorMessage;

    beforeEach(() => {
        setupTest();
        user = userEvent.setup();
        firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        discardButton = screen.getByRole('button', { name: /discard/i });
        anywhereElseOnScreen = screen.getByRole('textbox', {  name: /phoneinput/i});
        firstNameInputErrorMessage = screen.getByTestId('firstNameErrorMessage');
    });

    it('will save a new name in the field when a user types in the input', async () => {
        const newName = 'Test 1';
        
        expect(firstNameInput).toHaveDisplayValue('Daniel');
        await user.clear(firstNameInput);
        await user.type(firstNameInput, newName);
        expect(firstNameInput).toHaveValue(newName);
    });

    it('will discard all of the users changes if the user presses the discard button', async () => {
        const newName = 'Test 2';

        await user.clear(firstNameInput);
        await user.type(firstNameInput, newName);
        expect(firstNameInput).toHaveValue(newName);

        await user.click(discardButton);
        expect(firstNameInput).toHaveValue('Daniel');
    });

    it('will tell the user the field is required if the user does not put a value in the first name text area', async () => {        
        await user.clear(firstNameInput);
        await user.click(anywhereElseOnScreen);
        expect(firstNameInput).toBeEmptyDOMElement();
        expect(firstNameInputErrorMessage).toHaveTextContent('This field is required');
    });

    it('will tell the user that they have typed in an invalid name if the name does not meet the name validator conditions', async () => {
        const invalidName = '123456';

        await user.clear(firstNameInput);
        await user.type(firstNameInput, invalidName);
        await user.click(anywhereElseOnScreen);
        expect(firstNameInputErrorMessage).toHaveTextContent('This is an invalid name');
    });

    it('will tell the user that they should check for spaces if there is a space char at the beginning or end of the name if they have rogue space characters there', async () => {
        const invalidName = '  test for space  ';

        await user.clear(firstNameInput);
        await user.type(firstNameInput, invalidName);
        await user.click(anywhereElseOnScreen);
        expect(firstNameInputErrorMessage).toHaveTextContent('Field cannot begin or end with space character');
    });

    it('will tell the user that they cannot only use space characters in a name if they have done that', async () => {
        const invalidName = '   ';

        await user.clear(firstNameInput);
        await user.type(firstNameInput, invalidName);
        await user.click(anywhereElseOnScreen);
        expect(firstNameInputErrorMessage).toHaveTextContent('Field cannot contain only spaces');
    });

    it('will highlight the field if there is an error', async () => {        
        await user.clear(firstNameInput);
        await user.click(anywhereElseOnScreen);
        expect(firstNameInput).toHaveClass('error-field');
    });
});