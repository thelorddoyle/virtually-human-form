import { render, screen, within } from '@testing-library/react';
import { noErrorsAllowed } from './test-utils';

import App from './App';

noErrorsAllowed();

test('the App component and all of the components within the app render with no errors',  () => {
    render(<App />);

    const appContainer = screen.getByTestId('app-container');
    expect(appContainer).toBeInTheDocument();

    const settingsHeader = screen.getByRole('heading', {  name: /settings/i});
    expect(settingsHeader).toBeInTheDocument();

    const firstNameTitle = screen.getByText(/first name\*/i);
    expect(firstNameTitle).toBeInTheDocument();

    const firstNameView = screen.getByText(/first name\*/i);
    const firstNameBox = within(firstNameView).getByRole('textbox');
    expect(firstNameBox).toBeInTheDocument();

    const lastNameView = screen.getByText(/last name\*/i);
    const lastNameBox = within(lastNameView).getByRole('textbox');
    expect(lastNameBox).toBeInTheDocument();

    const emailView = screen.getByText(/email\*/i);
    const emailBox = within(emailView).getByRole('textbox');
    expect(emailBox).toBeInTheDocument();

    const phoneView = screen.getByText(/phone\*/i);
    const phoneBox = within(phoneView).getByRole('textbox');
    expect(phoneBox).toBeInTheDocument();

    const datePickerView = screen.getByText(/select your date of birth\*/i);
    expect(datePickerView).toBeInTheDocument();
    
    const dobMonth = screen.getByTestId('monthButton');
    expect(dobMonth).toBeInTheDocument();

    const dobDay = screen.getByTestId('dayButton');
    expect(dobDay).toBeInTheDocument();

    const dobYear = screen.getByTestId('yearButton');
    expect(dobYear).toBeInTheDocument();

    const bioView = screen.getByText(/bio\*/i);
    const bioBox = within(bioView).getByRole('textbox');
    expect(bioBox).toBeInTheDocument();

    const imageUploadView = screen.getByTestId('image-container');
    expect(imageUploadView).toBeInTheDocument();
    
    const saveButton = screen.getByRole('button', { name: /save changes/i });
    expect(saveButton).toBeInTheDocument();

    const discardButton = screen.getByRole('button', { name: /discard/i });
    expect(discardButton).toBeInTheDocument();
});