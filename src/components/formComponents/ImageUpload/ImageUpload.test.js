import { render, screen } from '@testing-library/react';
import { noErrorsAllowed } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import Form from '../../Form';

// allows me to call this function and render form in all it blocks
const setupTest = () => {render(<Form />);};

// ensures that no console errors occur in any of my it blocks or throw error in test
noErrorsAllowed();

describe('The image upload element', () => {

    let user, imageUploadElement, file, imageThumbnail, promptMessage, removeButton;

    beforeEach(() => {
        setupTest();
        user = userEvent.setup();
        imageUploadElement = screen.getByTestId('imageUploadInput');
        file = new File(['test'], 'test.png', {type: 'image/png'});
        imageThumbnail = screen.getByTestId('imageThumbnail');
        promptMessage = screen.getByTestId('promptMessage');
        removeButton = screen.getByRole('button', {name: /remove/i});
    });

    it('will accept a file being added to it', async () => {
        await user.upload(imageUploadElement, file);
        expect(imageUploadElement.files[0]).toStrictEqual(file);
        expect(imageUploadElement.files.item(0)).toStrictEqual(file);
        expect(imageUploadElement.files).toHaveLength(1);
    });

    it('will change the prompt & the image upload element class so that the prompt is hidden and the image thumbnail is showing', async () => {
        await user.upload(imageUploadElement, file);
        expect(imageThumbnail).toHaveClass('image-upload-thumb show-thumb');
        expect(promptMessage).toHaveClass('hide');
    });

    it('will remove the image if the user presses the Remove button underneath the image upload element', async () => {
        await user.upload(imageUploadElement, file);
        await user.click(removeButton);
        expect(imageThumbnail).toHaveClass('image-upload-thumb');
    });
});