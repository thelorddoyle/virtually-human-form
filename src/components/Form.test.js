/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import { noErrorsAllowed } from '../test-utils';
import userEvent from '@testing-library/user-event'

import Form from "./Form";

noErrorsAllowed();

describe('My form input rendering tests', () => {

    it('will render the input fields with the correct default values', () => {
        
        render(<Form />)

        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        expect(firstNameInput).toHaveDisplayValue('Daniel');

        const lastNameInput = screen.getByRole('textbox', {  name: /lastnameinput/i});
        expect(lastNameInput).toHaveDisplayValue('Lord-Doyle');

        const emailInput = screen.getByRole('textbox', {  name: /emailinput/i});
        expect(emailInput).toHaveDisplayValue('dlorddoyle@gmail.com');

        const phoneInput = screen.getByRole('textbox', {  name: /phoneinput/i});
        expect(phoneInput).toHaveDisplayValue('+61 451 087 593');

        const bioInput = screen.getByRole('textbox', {  name: /bioinput/i});
        expect(bioInput).toHaveDisplayValue(/i cannot wait to work for virtually human in the best and most innovative team in australia!/i);

        const monthButton = screen.getByTestId('monthButton');
        expect(monthButton).toHaveTextContent(/october/i);

        const dayButton = screen.getByTestId('dayButton');
        expect(dayButton).toHaveTextContent(/14/i);

        const yearButton = screen.getByTestId('yearButton');
        expect(yearButton).toHaveTextContent(/1988/i);

        const imageUploadPrompt = screen.getByTestId('promptMessage');
        expect(imageUploadPrompt).toHaveTextContent(/drop file here or click to upload/i);
        expect(imageUploadPrompt).toBeInTheDocument();

        // screen.debug();

    })
})

describe('My button rendering tests', () => {

    it('will render the buttons with the correct default values', () => {

        render(<Form />)

        const removeButton = screen.getByRole('button', { name: /remove/i })
        expect(removeButton).toBeInTheDocument()

        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        expect(saveChangesButton).toBeInTheDocument()

        const discardButton = screen.getByRole('button', { name: /discard/i })
        expect(discardButton).toBeInTheDocument()

    })

})

// test that if I write incorrect values (numbers, with spaces or empty field) that it will:
    // highlight in red and change class to error-field
    // the error field p will exist
    // the error field p will have the correct message in it per validation
// test that if I click submit that it console logs that value out (?? is this possible)
// test that if I write something in to the text box for first name and press discard changes the text changes back to the original default value