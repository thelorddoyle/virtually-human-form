import { render, screen } from '@testing-library/react';
import { noErrorsAllowed } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import Form from '../../Form';

const setupTest = () => {render(<Form />);};

noErrorsAllowed();

describe('The email field input', () => {

    let user, emailInput, discardButton, anywhereElseOnScreen, emailInputErrorMessage;

    beforeEach(() => {
        setupTest()
        user = userEvent.setup();
        emailInput = screen.getByRole('textbox', {  name: /emailinput/i});
        discardButton = screen.getByRole('button', { name: /discard/i });
        anywhereElseOnScreen = screen.getByRole('textbox', {  name: /phoneinput/i});
        emailInputErrorMessage = screen.getByTestId('emailErrorMessage');
    });

    it('will save a new email in the field when a user types in the input', async () => {
        const newEmail = 'test1@test.com';
                
        expect(emailInput).toHaveDisplayValue('dlorddoyle@gmail.com');
        await user.clear(emailInput);
        await user.type(emailInput, newEmail);
        expect(emailInput).toHaveValue(newEmail);
    });

    it('will discard all of my changes if I press the discard button', async () => {
        const newEmail = 'test2@test.com';
        
        expect(emailInput).toHaveDisplayValue('dlorddoyle@gmail.com');
        await user.clear(emailInput);
        await user.type(emailInput, newEmail);
        expect(emailInput).toHaveValue(newEmail);

        await user.click(discardButton);
        expect(emailInput).toHaveValue('dlorddoyle@gmail.com');
    });

    it('will tell the user the field is required if the user does not put a value in the email text area', async () => {
        await user.clear(emailInput);
        await user.click(anywhereElseOnScreen);
        expect(emailInput).toBeEmptyDOMElement();
        expect(emailInputErrorMessage).toHaveTextContent('This field is required');
    });

    it('will tell the user that they have typed in an invalid email if the name does not meet the email validator conditions', async () => {
        const invalidEmail = 'iamnotavalidemail';

        await user.clear(emailInput);
        await user.type(emailInput, invalidEmail);
        await user.click(anywhereElseOnScreen);
        expect(emailInputErrorMessage).toHaveTextContent('This is an invalid email');
    });

    it('will tell the user that they should check for spaces if there is a space char at the beginning or end of the email if they have rogue space characters there', async () => {
        const invalidEmail = ' iamavalidemail@gmail.com ';

        await user.clear(emailInput);
        await user.type(emailInput, invalidEmail);
        await user.click(anywhereElseOnScreen);
        expect(emailInputErrorMessage).toHaveTextContent('Field cannot begin or end with space character');
    });

    it('will tell the user that they cannot only use space characters in an email if they have done that', async () => {
        const invalidEmail = '   ';

        await user.clear(emailInput);
        await user.type(emailInput, invalidEmail);
        await user.click(anywhereElseOnScreen);
        expect(emailInputErrorMessage).toHaveTextContent('Field cannot contain only spaces');
    });

    it('will highlight the field if there is an error', async () => {

        await user.clear(emailInput);
        await user.click(anywhereElseOnScreen);

        // CSS is looking for error field in order to highlight the field
        expect(emailInput).toHaveClass('error-field');
    });
});