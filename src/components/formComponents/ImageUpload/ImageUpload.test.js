import { render, screen } from "@testing-library/react";
import { noErrorsAllowed } from '../../../test-utils';
import userEvent from '@testing-library/user-event'

import Form from "../../Form";

// allows me to call this function and render form in all it blocks
const setupTest = () => {render(<Form />);};

// ensures that no console errors occur in any of my it blocks or throw error in test
noErrorsAllowed();

describe('The image upload element', () => {

    it('will accept a file being added to it', async () => {
        setupTest()

        const user = userEvent.setup()
        const imageUploadElement = screen.getByTestId('imageUploadInput')
        const file = new File(['test'], 'test.png', {type: 'image/png'})

        await user.upload(imageUploadElement, file)
        expect(imageUploadElement.files[0]).toStrictEqual(file)
        expect(imageUploadElement.files.item(0)).toStrictEqual(file)
        expect(imageUploadElement.files).toHaveLength(1)
    })

    it('will change the prompt & the image upload element class so that the prompt is hidden and the image thumbnail is showing', async () => {
        setupTest()

        const user = userEvent.setup()
        const imageUploadElement = screen.getByTestId('imageUploadInput')
        const file = new File(['test'], 'test.png', {type: 'image/png'})
        const imageThumbnail = screen.getByTestId('imageThumbnail')
        const promptMessage = screen.getByTestId('promptMessage')

        await user.upload(imageUploadElement, file)
        expect(imageThumbnail).toHaveClass('image-upload-thumb show-thumb')
        expect(promptMessage).toHaveClass('hide')
    })

    it('will remove the image if the user presses the Remove button underneath the image upload element', async () => {
        setupTest()

        const user = userEvent.setup()
        const imageUploadElement = screen.getByTestId('imageUploadInput')
        const file = new File(['test'], 'test.png', {type: 'image/png'})
        const removeButton = screen.getByRole('button', {name: /remove/i})
        const imageThumbnail = screen.getByTestId('imageThumbnail')

        await user.upload(imageUploadElement, file)
        await user.click(removeButton)
        expect(imageThumbnail).toHaveClass('image-upload-thumb')
    })
})