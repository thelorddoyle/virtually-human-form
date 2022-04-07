import { render, screen } from '@testing-library/react';
import { noErrorsAllowed } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import Form from '../../Form';

// allows me to call this function and render form in all it blocks
const setupTest = () => {render(<Form />);};

// ensures that no console errors occur in any of my it blocks or throw error in test
noErrorsAllowed();

describe('The phone field input', () => {

    beforeEach(() => {
        setupTest();
    });

    it('will save a new phone number in the field when a user types in the input', async () => {
        const user = userEvent.setup();
        const phoneInput = screen.getByRole('textbox', {name: /phoneinput/i});
        const newphone = 'test1@test.com';
                
        expect(phoneInput).toHaveDisplayValue('+61 451 087 593');
        await user.clear(phoneInput);
        await user.type(phoneInput, newphone);
        expect(phoneInput).toHaveValue(newphone);
    });

    it('will discard all of my changes if I press the discard button', async () => {
        const user = userEvent.setup();
        const phoneInput = screen.getByRole('textbox', {name: /phoneinput/i});
        const discardButton = screen.getByRole('button', { name: /discard/i });
        const newphone = 'test3@test.com';
        
        expect(phoneInput).toHaveDisplayValue('+61 451 087 593');
        await user.clear(phoneInput);
        await user.type(phoneInput, newphone);
        expect(phoneInput).toHaveValue(newphone);

        await user.click(discardButton);
        expect(phoneInput).toHaveValue('+61 451 087 593');
    });

    it('will tell the user the field is required if the user does not put a value in the phone text area', async () => {        
        const user = userEvent.setup();
        const phoneInput = screen.getByRole('textbox', {name: /phoneinput/i});
        const anywhereElseOnScreen = screen.getByRole('textbox', {name: /emailinput/i});
        const phoneInputErrorMessage = screen.getByTestId('phoneErrorMessage');

        await user.clear(phoneInput);
        await user.click(anywhereElseOnScreen);
        expect(phoneInput).toBeEmptyDOMElement();
        expect(phoneInputErrorMessage).toHaveTextContent('This field is required');
    });

    it('will tell the user that they have typed in an invalid phone number if the name does not meet the phone number validator conditions', async () => {
        const user = userEvent.setup();
        const phoneInput = screen.getByRole('textbox', {name: /phoneinput/i});
        const anywhereElseOnScreen = screen.getByRole('textbox', {name: /emailinput/i});
        const phoneInputErrorMessage = screen.getByTestId('phoneErrorMessage');
        const invalidphone = 'iamnotavalidphone';

        await user.clear(phoneInput);
        await user.type(phoneInput, invalidphone);
        await user.click(anywhereElseOnScreen);
        expect(phoneInputErrorMessage).toHaveTextContent('Please use a valid phone number');
    });

    it('will tell the user that they should check for spaces if there is a space char at the beginning or end of the phone number if they have rogue space characters there', async () => {
        const user = userEvent.setup();
        const phoneInput = screen.getByRole('textbox', {name: /phoneinput/i});
        const anywhereElseOnScreen = screen.getByRole('textbox', {name: /emailinput/i});
        const phoneInputErrorMessage = screen.getByTestId('phoneErrorMessage');
        const invalidphone = ' iamavalidphone@gmail.com ';

        await user.clear(phoneInput);
        await user.type(phoneInput, invalidphone);
        await user.click(anywhereElseOnScreen);
        expect(phoneInputErrorMessage).toHaveTextContent('Field cannot begin or end with space character');
    });

    it('will tell the user that they cannot only use space characters in a phone number if they have done that', async () => {
        const user = userEvent.setup();
        const phoneInput = screen.getByRole('textbox', {name: /phoneinput/i});
        const anywhereElseOnScreen = screen.getByRole('textbox', {name: /emailinput/i});
        const phoneInputErrorMessage = screen.getByTestId('phoneErrorMessage');
        const invalidphone = '   ';

        await user.clear(phoneInput);
        await user.type(phoneInput, invalidphone);
        await user.click(anywhereElseOnScreen);
        expect(phoneInputErrorMessage).toHaveTextContent('Field cannot contain only spaces');
    });

    it('will highlight the field if there is an error', async () => {        
        const user = userEvent.setup();
        const phoneInput = screen.getByRole('textbox', {name: /phoneinput/i});
        const anywhereElseOnScreen = screen.getByRole('textbox', {name: /emailinput/i});

        await user.clear(phoneInput);
        await user.click(anywhereElseOnScreen);
        expect(phoneInput).toHaveClass('error-field');
    });
});