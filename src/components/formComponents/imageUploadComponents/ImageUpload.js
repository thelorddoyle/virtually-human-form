import imgIcon from '../../../images/imgIcon.png'
import { ImageDisplay } from './ImageDisplay'

import React, { useEffect, useRef } from 'react';
import { resetImageHelper, updateThumbnail } from '../../../helpers/imageUploadHelpers'

const ImageUpload = ({image, setImage }) => {

    const uploadRef = useRef();
    const uploadInputRef = useRef();
    const removeButtonRef = useRef();
    let dragOptions = ['dragend', 'dragleave'];
    
    // listens for resetImage
    useEffect(() => {
        if (image === '') {
            resetImageHelper(uploadRef)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    // check to see if the DOM elements have been rendered
    if (uploadRef && 
        uploadRef.current && 
        uploadInputRef && 
        uploadInputRef.current && 
        removeButtonRef && 
        removeButtonRef.current) {

        let uploadElement = uploadRef.current;
        let inputElement = uploadInputRef.current;

        // make it so image can be clicked on to upload images too
        uploadElement.addEventListener('click', e => {
            inputElement.click();
        });

        // to turn border solid when we drag over
        uploadElement.addEventListener('dragover', e => {
            e.preventDefault();
            uploadElement.classList.add('image-upload-over');
        });

        // this uses the dragOptions to ensure we have the correct behaviour for the border
        dragOptions.forEach(type => {
            uploadElement.addEventListener(type, e => {
                uploadElement.classList.remove('image-upload-over');
            });
        });

        // handles file being stored in to inputElement.files when an image is dropped on to the uploadElement
        uploadElement.addEventListener('drop', e => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateThumbnail(uploadElement, e.dataTransfer.files[0], setImage);
            }
            uploadElement.classList.remove('image-upload-over');
        });
        
        // send the correct DOM element, the file itself and the setImage function to updateThumbnail
        inputElement.addEventListener('change', e => {
            if (inputElement.files.length) {
                updateThumbnail(uploadElement, inputElement.files[0], setImage);
            }
        });

        // if someone clicks on the remove button, set image to blank which prompts the useEffect above to manipulate the DOM
        removeButtonRef.current.addEventListener('click', e => {
            setImage('');
        });
    };

    return (
        <ImageDisplay uploadRef={uploadRef} 
                        imgIcon={imgIcon}
                        uploadInputRef={uploadInputRef}
                        removeButtonRef={removeButtonRef}/>
      );
};

export default ImageUpload;