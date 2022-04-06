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

describe('On my first name field input', () => {

    it('will save a new name in the field when a user types in the input', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        // test that if I write a new name in the first name field it appears as text on the page and not any other text
        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        expect(firstNameInput).toHaveDisplayValue('Daniel');

        const newName = 'Test 1'

        // type in new name 'Test' as configured above
        await user.clear(firstNameInput)
        await user.type(firstNameInput, newName)
        expect(firstNameInput).toHaveValue(newName)

    })

    it('will show the new first name in the console if user clicks Save button', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        const newName = 'Test 2'

        // type in new name 'Test' as configured above
        await user.clear(firstNameInput)
        await user.type(firstNameInput, newName)
        
        // if I click save, the console log includes the new name TODO: it does console log but how do I test?
        await user.click(saveChangesButton)
        expect(firstNameInput).toHaveValue(newName)
    })

    it('will discard all of my changes if I press the discard button', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        // test that if I write a new name in the first name field it appears as text on the page and not any other text
        const firstNameInput = screen.getByRole('textbox', {  name: /firstnameinput/i});
        expect(firstNameInput).toHaveDisplayValue('Daniel');

        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        expect(saveChangesButton).toBeInTheDocument()

        const discardButton = screen.getByRole('button', { name: /discard/i })
        expect(discardButton).toBeInTheDocument()

        const newName = 'Test 3'

        // type in new name 'Test' as configured above
        await user.clear(firstNameInput)
        await user.type(firstNameInput, newName)
        expect(firstNameInput).toHaveValue(newName)

        //  if I click Discard button the name returns to the default value
        await user.click(discardButton)
        expect(firstNameInput).toHaveValue('Daniel')

    })
})

describe('On my last name field input', () => {

    it('will save a new name in the field when a user types in the input', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const lastNameInput = screen.getByRole('textbox', {  name: /lastnameinput/i});
        expect(lastNameInput).toHaveDisplayValue('Lord-Doyle');

        const newName = 'Test 1'

        await user.clear(lastNameInput)
        await user.type(lastNameInput, newName)
        expect(lastNameInput).toHaveValue(newName)

    })

    it('will show the new last name in the console if user clicks Save button', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const lastNameInput = screen.getByRole('textbox', {  name: /lastnameinput/i});
        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        const newName = 'Test 2'

        await user.clear(lastNameInput)
        await user.type(lastNameInput, newName)
        
        await user.click(saveChangesButton)
        expect(lastNameInput).toHaveValue(newName)
    })

    it('will discard all of my changes if I press the discard button', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const lastNameInput = screen.getByRole('textbox', {  name: /lastnameinput/i});
        expect(lastNameInput).toHaveDisplayValue('Lord-Doyle');

        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        expect(saveChangesButton).toBeInTheDocument()

        const discardButton = screen.getByRole('button', { name: /discard/i })
        expect(discardButton).toBeInTheDocument()

        const newName = 'Test 3'

        await user.clear(lastNameInput)
        await user.type(lastNameInput, newName)
        expect(lastNameInput).toHaveValue(newName)

        await user.click(discardButton)
        expect(lastNameInput).toHaveValue('Lord-Doyle')

    })
})

describe('On my email field input', () => {

    it('will save a new email in the field when a user types in the input', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const emailInput = screen.getByRole('textbox', {  name: /emailinput/i});
        expect(emailInput).toHaveDisplayValue('dlorddoyle@gmail.com');

        const newEmail = 'test1@test.com'

        await user.clear(emailInput)
        await user.type(emailInput, newEmail)
        expect(emailInput).toHaveValue(newEmail)

    })

    it('will show the new email in the console if user clicks Save button', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const emailInput = screen.getByRole('textbox', {  name: /emailinput/i});
        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        const newEmail = 'test2@test.com'

        await user.clear(emailInput)
        await user.type(emailInput, newEmail)
        
        await user.click(saveChangesButton)
        expect(emailInput).toHaveValue(newEmail)
    })

    it('will discard all of my changes if I press the discard button', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const emailInput = screen.getByRole('textbox', {  name: /emailinput/i});
        expect(emailInput).toHaveDisplayValue('dlorddoyle@gmail.com');

        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        expect(saveChangesButton).toBeInTheDocument()

        const discardButton = screen.getByRole('button', { name: /discard/i })
        expect(discardButton).toBeInTheDocument()

        const newEmail = 'test3@test.com'

        await user.clear(emailInput)
        await user.type(emailInput, newEmail)
        expect(emailInput).toHaveValue(newEmail)

        await user.click(discardButton)
        expect(emailInput).toHaveValue('dlorddoyle@gmail.com')

    })
})

describe('On my phone field input', () => {

    it('will save a new phone number in the field when a user types in the input', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        // test that if I write a new phone number in the phone field it appears as text on the page and not any other text
        const phoneInput = screen.getByRole('textbox', {  name: /phoneinput/i});
        expect(phoneInput).toHaveDisplayValue('+61 451 087 593');

        const newName = '+61 123 456 789'

        await user.clear(phoneInput)
        await user.type(phoneInput, newName)
        expect(phoneInput).toHaveValue(newName)

    })

    it('will show the new phone in the console if user clicks Save button', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const phoneInput = screen.getByRole('textbox', {  name: /phoneinput/i});
        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        const newName = '+61 456 123 123'

        await user.clear(phoneInput)
        await user.type(phoneInput, newName)
        
        await user.click(saveChangesButton)
        expect(phoneInput).toHaveValue(newName)
    })

    it('will discard all of my changes if I press the discard button', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        // test that if I write a new name in the phone field it appears as text on the page and not any other text
        const phoneInput = screen.getByRole('textbox', {  name: /phoneinput/i});
        expect(phoneInput).toHaveDisplayValue('+61 451 087 593');

        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        expect(saveChangesButton).toBeInTheDocument()

        const discardButton = screen.getByRole('button', { name: /discard/i })
        expect(discardButton).toBeInTheDocument()

        const newName = '+64 321 654 987'

        // type in new name 'Test' as configured above
        await user.clear(phoneInput)
        await user.type(phoneInput, newName)
        expect(phoneInput).toHaveValue(newName)

        //  if I click Discard button the name returns to the default value
        await user.click(discardButton)
        expect(phoneInput).toHaveValue('+61 451 087 593')

    })
})

describe('On my bio field input', () => {

    it('will save a new name in the field when a user types in the input', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const bioInput = screen.getByRole('textbox', {  name: /bioinput/i});
        expect(bioInput).toHaveDisplayValue('I cannot wait to work for Virtually Human in the best and most innovative team in Australia!');

        const newBio = 'I am a new description'

        await user.clear(bioInput)
        await user.type(bioInput, newBio)
        expect(bioInput).toHaveValue(newBio)

    })

    it('will show the new bio in the console if user clicks Save button', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const bioInput = screen.getByRole('textbox', {  name: /bioinput/i});
        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        const newBio = 'I am an even newer description'

        await user.clear(bioInput)
        await user.type(bioInput, newBio)
        
        await user.click(saveChangesButton)
        expect(bioInput).toHaveValue(newBio)
    })

    it('will discard all of my changes if I press the discard button', async () => {

        const user = userEvent.setup()
        
        render(<Form />)
        
        const bioInput = screen.getByRole('textbox', {  name: /bioinput/i});
        expect(bioInput).toHaveDisplayValue('I cannot wait to work for Virtually Human in the best and most innovative team in Australia!');

        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        expect(saveChangesButton).toBeInTheDocument()

        const discardButton = screen.getByRole('button', { name: /discard/i })
        expect(discardButton).toBeInTheDocument()

        const newBio = 'I am the newest description'

        await user.clear(bioInput)
        await user.type(bioInput, newBio)
        expect(bioInput).toHaveValue(newBio)

        await user.click(discardButton)
        expect(bioInput).toHaveValue('I cannot wait to work for Virtually Human in the best and most innovative team in Australia!')

    })
})

// test that if I write incorrect values (numbers, with spaces or empty field) that it will:
    // highlight in red and change class to error-field
    // the error field p will exist
    // the error field p will have the correct message in it per validation
// test that if I click submit that it console logs that value out (?? is this possible)
// test that if I write something in to the text box for first name and press discard changes the text changes back to the original default value