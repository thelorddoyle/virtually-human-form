import { render, screen } from '@testing-library/react';
import { noErrorsAllowed } from '../../../test-utils';
import userEvent from '@testing-library/user-event'

import Form from '../../Form';

const setupTest = () => {render(<Form />);};
noErrorsAllowed();

describe('The bio field input text area', () => {

    let bioInput, discardButton, user, anywhereElseOnScreen, bioInputErrorMessage;

    beforeEach(() => {
        setupTest();
        user = userEvent.setup();
        bioInput = screen.getByRole('textbox', {  name: /bioinput/i});
        discardButton = screen.getByRole('button', { name: /discard/i });
        anywhereElseOnScreen = screen.getByRole('textbox', {  name: /phoneinput/i});
        bioInputErrorMessage = screen.getByTestId('bioErrorMessage');
    });

    it('will save a new description in the field when a user types in the input', async () => {  
        const newBio = 'I am a new description';
        
        expect(bioInput).toHaveDisplayValue('I cannot wait to work for Virtually Human in the best and most innovative team in Australia!');
        await user.clear(bioInput);
        await user.type(bioInput, newBio);
        expect(bioInput).toHaveValue(newBio);
    });

    it('will discard all of a users changes if the user presses the discard button', async () => {
        const newBio = 'I am the newest description';
        
        await user.clear(bioInput);
        await user.type(bioInput, newBio);
        expect(bioInput).toHaveValue(newBio);
        await user.click(discardButton);
        expect(bioInput).toHaveValue('I cannot wait to work for Virtually Human in the best and most innovative team in Australia!');
    });

    it('will tell me the field is required if the user does not put a value in the Bio text area', async () => {
        const bioInputErrorMessage = screen.getByTestId('bioErrorMessage');

        await user.clear(bioInput);
        await user.click(anywhereElseOnScreen);
        expect(bioInput).toBeEmptyDOMElement();
        expect(bioInputErrorMessage).toHaveTextContent('This field is required');
    });

    it('will tell the user that they should check for spaces if there is a space char at the beginning or end of the Bio if they have rogue space characters there', async () => {
        const invalidBio = '  test for space  ';

        await user.clear(bioInput);
        await user.type(bioInput, invalidBio);
        await user.click(anywhereElseOnScreen);
        expect(bioInputErrorMessage).toHaveTextContent('Field cannot begin or end with space character');
    })

    it('will tell the user that they cannot only use space characters in a Bio if they have done that', async () => {
        const invalidBio = '    ';

        await user.clear(bioInput);
        await user.type(bioInput, invalidBio);
        await user.click(anywhereElseOnScreen);
        expect(bioInputErrorMessage).toHaveTextContent('Field cannot contain only spaces');
    })

    it('will highlight the field if there is an error', async () => {

        await user.clear(bioInput);
        await user.click(anywhereElseOnScreen);
        expect(bioInput).toHaveClass('error-field');
    });
});