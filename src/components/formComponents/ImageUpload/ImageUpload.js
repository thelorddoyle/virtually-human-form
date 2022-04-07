import imgIcon from '../../../images/imgIcon.png'

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
    const [uploadEl, setUploadEl] = useState('')
    
    // listens for resetImage
    useEffect(() => {
        if (image === null) {
            resetImageHelper(thumb, thumbnailElement, setThumb, setPrompt)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    useEffect(() => {
        manageEventListeners(uploadRef, uploadInputRef, removeButtonRef, setThumb, setPrompt, thumbnailElement, setImage, uploadEl, setUploadEl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div data-testid="image-container" className="image-container" >
    
            <label htmlFor="file-uploader" className="image-label">IMAGE</label>
    
            <div ref={uploadRef} className={uploadEl} >
                <div className="image-icon">
                    <img src={imgIcon} alt="imageIcon" className="camera" />
                </div>
                <span data-testid="promptMessage" aria-label="dropFileOrClickHerePrompt" ref={promptElement} className={prompt} >Drop file here or click to upload</span>
                <div data-testid="imageThumbnail" ref={thumbnailElement} className={thumb} ></div>
                <input id="file-uploader" data-testid="imageUploadInput" ref={uploadInputRef} type="file" name="myFile" className="image-upload-input" accept="image/*" />
            </div>
    
            <div>
                <button ref={removeButtonRef} className="remove-button">Remove</button>
            </div>
        </div>
    );
};

export default ImageUpload;