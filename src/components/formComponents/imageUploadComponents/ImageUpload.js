import imgIcon from '../../../images/imgIcon.png'
import { ImageDisplay } from './ImageDisplay'

import React, { useEffect, useRef, useState } from 'react';
import { manageEventListeners } from '../../../helpers/imageUpload/manageEventListeners';
import { resetImageHelper } from '../../../helpers/imageUpload/resetImage';

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
        if (image === null) {
            resetImageHelper(thumbnailElement, setThumb, setPrompt)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    useEffect(() => {
        manageEventListeners(uploadRef, uploadInputRef, removeButtonRef, setThumb, setPrompt, thumbnailElement, setImage)
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