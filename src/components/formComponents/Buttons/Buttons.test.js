/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import { noErrorsAllowed } from '../../../test-utils';

import Form from "./../../Form";

const setupTest = () => {render(<Form />);};

noErrorsAllowed();

describe('My button rendering tests', () => {
    it('will render the buttons with the correct default values', () => {
        setupTest()

        const removeButton = screen.getByRole('button', { name: /remove/i })
        expect(removeButton).toBeInTheDocument()

        const saveChangesButton = screen.getByRole('button', { name: /save changes/i })
        expect(saveChangesButton).toBeInTheDocument()

        const discardButton = screen.getByRole('button', { name: /discard/i })
        expect(discardButton).toBeInTheDocument()
    })
})