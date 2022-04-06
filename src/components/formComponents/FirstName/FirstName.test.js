import { render, screen } from "@testing-library/react";
import { noErrorsAllowed } from '../../../test-utils';
import userEvent from '@testing-library/user-event'

import Form from "../../Form";

// allows me to call this function and render form in all it blocks
const setupTest = () => {render(<Form />);};

// ensures that no console errors occur in any of my it blocks or throw error in test
noErrorsAllowed();

describe('The first name field input', () => {

    it('will save a new name in the field when a user types in the input', async () => {
        setupTest()

        const user = userEvent.setup()        
        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        const newName = 'Test 1'
        
        expect(firstNameInput).toHaveDisplayValue('Daniel');
        await user.clear(firstNameInput)
        await user.type(firstNameInput, newName)
        expect(firstNameInput).toHaveValue(newName)
    });

    it('will discard all of the users changes if the user presses the discard button', async () => {
        setupTest()

        const user = userEvent.setup()
        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        const discardButton = screen.getByRole('button', { name: /discard/i })
        const newName = 'Test 3'

        await user.clear(firstNameInput)
        await user.type(firstNameInput, newName)
        expect(firstNameInput).toHaveValue(newName)

        await user.click(discardButton)
        expect(firstNameInput).toHaveValue('Daniel')
    });

    it('will tell the user the field is required if the user does not put a value in the first name text area', async () => {
        setupTest()
        
        const user = userEvent.setup()
        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        const anywhereElseOnScreen = screen.getByRole('textbox', {  name: /phoneinput/i});
        const firstNameInputErrorMessage = screen.getByTestId('firstNameErrorMessage')

        await user.clear(firstNameInput)
        await user.click(anywhereElseOnScreen)
        expect(firstNameInput).toBeEmptyDOMElement();
        expect(firstNameInputErrorMessage).toHaveTextContent('This field is required')
    })

    it('will tell the user that they have typed in an invalid name if the name does not meet the name validator conditions', async () => {
        setupTest()

        const user = userEvent.setup()
        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        const anywhereElseOnScreen = screen.getByRole('textbox', {  name: /phoneinput/i});
        const firstNameInputErrorMessage = screen.getByTestId('firstNameErrorMessage')
        const invalidName = '123456'

        await user.clear(firstNameInput)
        await user.type(firstNameInput, invalidName)
        await user.click(anywhereElseOnScreen)
        expect(firstNameInputErrorMessage).toHaveTextContent('This is an invalid name')
    })

    it('will tell the user that they should check for spaces if there is a space char at the beginning or end of the name if they have rogue space characters there', async () => {
        setupTest()

        const user = userEvent.setup()
        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        const anywhereElseOnScreen = screen.getByRole('textbox', {  name: /phoneinput/i});
        const firstNameInputErrorMessage = screen.getByTestId('firstNameErrorMessage')
        const invalidName = '  test for space  '

        await user.clear(firstNameInput)
        await user.type(firstNameInput, invalidName)
        await user.click(anywhereElseOnScreen)
        expect(firstNameInputErrorMessage).toHaveTextContent('Field cannot begin or end with space character')
    })

    it('will tell the user that they cannot only use space characters in a name if they have done that', async () => {
        setupTest()

        const user = userEvent.setup()
        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        const anywhereElseOnScreen = screen.getByRole('textbox', {  name: /phoneinput/i});
        const firstNameInputErrorMessage = screen.getByTestId('firstNameErrorMessage')
        const invalidName = '   '

        await user.clear(firstNameInput)
        await user.type(firstNameInput, invalidName)
        await user.click(anywhereElseOnScreen)
        expect(firstNameInputErrorMessage).toHaveTextContent('Field cannot contain only spaces')
    })

    it('will highlight the field if there is an error', async () => {
        setupTest()
        
        const user = userEvent.setup()
        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        const anywhereElseOnScreen = screen.getByRole('textbox', {  name: /phoneinput/i});

        await user.clear(firstNameInput)
        await user.click(anywhereElseOnScreen)

        // CSS is looking for error field in order to highlight the field
        expect(firstNameInput).toHaveClass('error-field')

    })
});