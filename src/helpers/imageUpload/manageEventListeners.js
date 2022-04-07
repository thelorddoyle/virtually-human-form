import { updateThumbnail } from './updateThumbnail';

export const manageEventListeners = (uploadRef, uploadInputRef, removeButtonRef, setThumb, setPrompt, thumbnailElement, setImage, uploadEl, setUploadEl) => {

    if (uploadRef?.current && uploadInputRef?.current && removeButtonRef?.current) {

        // list for drag content
        const uploadElement = uploadRef.current;
        const inputElement = uploadInputRef.current;
        const dragOptions = ['dragend', 'dragleave'];
        setThumb('image-upload-thumb')
        setPrompt('image-upload-prompt')
        setUploadEl('image-upload')

        // make it so image can be clicked on to upload images too
        uploadElement.addEventListener('click', e => {
            inputElement.click();
        });

        // to turn border solid when we drag over
        uploadElement.addEventListener('dragover', e => {
            e.preventDefault();
            setUploadEl('image-upload image-upload-over')
        });

        // this uses the dragOptions to ensure we have the correct behaviour for the border
        dragOptions.forEach(type => {
            uploadElement.addEventListener(type, e => {
                setUploadEl('image-upload')
            });
        });

        // handles file being stored in to inputElement.files when an image is dropped on to the uploadElement
        uploadElement.addEventListener('drop', e => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateThumbnail(thumbnailElement, e.dataTransfer.files[0], setImage, setThumb, setPrompt);
            }
            uploadElement.classList.remove('image-upload-over');
        });
        
        // send the correct DOM element, the file itself and the setImage function to updateThumbnail
        inputElement.addEventListener('change', e => {
            if (inputElement.files.length) {
                updateThumbnail(thumbnailElement, inputElement.files[0], setImage, setThumb, setPrompt);
            }
        });

        // if someone clicks on the remove button, set image to blank which prompts the useEffect above to manipulate the DOM
        removeButtonRef.current.addEventListener('click', e => {
            setImage(null);
        });

        // I have added this in preparation for the form to be part of a larger app, as we will want to remove EventListeners when we unmount the component
        // TODO: Is there a cleaner way to do this? Maybe a window.removeEventListener(all???)
        return () => {
            uploadElement.removeEventListener('click', e => {
                inputElement.click();
            });

            uploadElement.removeEventListener('dragover', e => {
                e.preventDefault();
                setUploadEl('image-upload image-upload-over')
            });

            // this uses the dragOptions to ensure we have the correct behaviour for the border
            dragOptions.forEach(type => {
                uploadElement.removeEventListener(type, e => {
                    setUploadEl('image-upload-over');
                });
            });

            // handles file being stored in to inputElement.files when an image is dropped on to the uploadElement
            uploadElement.removeEventListener('drop', e => {
                e.preventDefault();
                if (e.dataTransfer.files.length) {
                    inputElement.files = e.dataTransfer.files;
                    updateThumbnail(thumbnailElement, e.dataTransfer.files[0], setImage, setThumb, setPrompt );
                }
                uploadElement.classList.remove('image-upload-over');
            });
            
            // send the correct DOM element, the file itself and the setImage function to updateThumbnail
            inputElement.removeEventListener('change', e => {
                if (inputElement.files.length) {
                    updateThumbnail(thumbnailElement, inputElement.files[0], setImage, setThumb, setPrompt );
                }
            });

            // if someone clicks on the remove button, set image to blank which prompts the useEffect above to manipulate the DOM
            removeButtonRef.current.removeEventListener('click', e => {
                setImage('');
            });
        };
        };
}