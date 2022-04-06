import { render, screen } from "@testing-library/react";
import { noErrorsAllowed } from '../../../test-utils';
import userEvent from '@testing-library/user-event'

import Form from "../../Form";
import { useReducer } from "react";

// allows me to call this function and render form in all it blocks
const setupTest = () => {render(<Form />);};

// ensures that no console errors occur in any of my it blocks or throw error in test
noErrorsAllowed();

describe('The success banner', () => {

    jest.setTimeout(30000)

    it('will appear on screen when a user submits a valid form', async () => {
        setupTest()

        const user = userEvent.setup()
        const saveButton = screen.getByText(/save changes/i)
                
        await user.click(saveButton)
        const successBanner = screen.getByText(/changes have been saved successfully/i)

        expect(successBanner).toBeInTheDocument()
        expect(successBanner).toHaveClass('success-banner-showing')
    })

    it('will not appear on screen unless a user submits a valid form', () => {
        setupTest()
        const successBanner = screen.getByText(/changes have been saved successfully/i)

        expect(successBanner).toBeInTheDocument()
        expect(successBanner).toHaveClass('success-banner-hidden')
    })
});