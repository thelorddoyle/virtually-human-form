import { render, screen } from '@testing-library/react';
import { noErrorsAllowed } from '../test-utils';

import Form from './Form';

const setupTest = () => {render(<Form />);};

noErrorsAllowed();

describe('My form input rendering tests', () => {

    it('will render the input fields with the correct default values', () => {
        setupTest();

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
    });
});