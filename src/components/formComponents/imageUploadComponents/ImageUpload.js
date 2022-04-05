import imgIcon from '../../../images/imgIcon.png'
import { ImageDisplay } from './ImageDisplay'

import React, { useEffect, useRef, useState } from 'react';
import { resetImageHelper, updateThumbnail } from '../../../helpers/imageUploadHelpers'

const ImageUpload = ({image, setImage }) => {

    // references
    const uploadRef = useRef();
    const uploadInputRef = useRef();
    const removeButtonRef = useRef();
    const thumbnailElement = useRef('');
    const promptElement = useRef('');
    
    // state variables for toggling image and prompt
    const [thumb, setThumb] = useState('')
    const [prompt, setPrompt] = useState('')
    
    // listens for resetImage
    useEffect(() => {
        if (image === '') {
            resetImageHelper(uploadRef, thumbnailElement, setThumb, setPrompt)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    useEffect(() => {
    // check to see if the DOM elements have been rendered
    if (uploadRef && 
        uploadRef.current && 
        uploadInputRef && 
        uploadInputRef.current && 
        removeButtonRef && 
        removeButtonRef.current) {

        // list for drag content
        let uploadElement = uploadRef.current;
        let inputElement = uploadInputRef.current;
        let dragOptions = ['dragend', 'dragleave'];
        setThumb('image-upload-thumb')
        setPrompt('image-upload-prompt')

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
            setImage('');
        });

        // I have added this in preparation for the form to be part of a larger app, as we will want to remove EventListeners when we unmount the component
        // TODO: Is there a cleaner way to do this? Maybe a window.removeEventListener(all???)
        return () => {
            uploadElement.removeEventListener('click', e => {
                inputElement.click();
            });

            uploadElement.removeEventListener('dragover', e => {
                e.preventDefault();
                uploadElement.classList.add('image-upload-over');
            });

            // this uses the dragOptions to ensure we have the correct behaviour for the border
            dragOptions.forEach(type => {
                uploadElement.removeEventListener(type, e => {
                    uploadElement.classList.remove('image-upload-over');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ImageDisplay uploadRef={uploadRef} 
                        imgIcon={imgIcon}
                        uploadInputRef={uploadInputRef}
                        removeButtonRef={removeButtonRef}
                        thumb={thumb}
                        thumbnailElement={thumbnailElement}
                        prompt={prompt}
                        promptElement={promptElement}
                        />
      );
};

export default ImageUpload;