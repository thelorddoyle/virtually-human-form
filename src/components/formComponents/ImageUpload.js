import imgIcon from '../../images/imgIcon.png'

import React, { useEffect, useRef } from 'react';
import { resetImageHelper, updateThumbnail } from './../../helpers/imageUploadHelpers'

const ImageUpload = ({image, setImage }) => {

    const uploadRef = useRef();
    const uploadInputRef = useRef();
    const removeButtonRef = useRef();
    let dragOptions = ['dragend', 'dragleave']
    
    // listens for resetImage TODO: can tie this up with state to tidy it up
    useEffect(() => {
        if (image === '') {
            resetImageHelper(uploadRef)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])

    // check to see if the DOM elements have been rendered
    if (uploadRef && 
        uploadRef.current && 
        uploadInputRef && 
        uploadInputRef.current && 
        removeButtonRef && 
        removeButtonRef.current) {

        let uploadElement = uploadRef.current
        let inputElement = uploadInputRef.current

        // make it so image can be clicked on to upload images too
        uploadElement.addEventListener('click', e => {
            inputElement.click();
        })

        // to turn border solid when we drag over
        uploadElement.addEventListener('dragover', e => {
            e.preventDefault()
            uploadElement.classList.add('image-upload-over');
        })

        // this uses the dragOptions to ensure we have the correct behaviour for the border
        dragOptions.forEach(type => {
            uploadElement.addEventListener(type, e => {
                uploadElement.classList.remove('image-upload-over')
            })
        })

        // handles file being stored in to inputElement.files when an image is dropped on to the uploadElement
        uploadElement.addEventListener('drop', e => {
            e.preventDefault()
            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateThumbnail(uploadElement, e.dataTransfer.files[0], setImage)
            }
            uploadElement.classList.remove('image-upload-over');
        })
        
        // send the correct DOM element, the file itself and the setImage function to updateThumbnail
        inputElement.addEventListener('change', e => {
            if (inputElement.files.length) {
                updateThumbnail(uploadElement, inputElement.files[0], setImage)
            }
        })

        // if someone clicks on the remove button, set image to blank which prompts the useEffect above to manipulate the DOM
        removeButtonRef.current.addEventListener('click', e => {
            setImage('')
        })
    }

      return (
          <div data-testid="image-container" className='image-container' >

            <label className='image-label'>IMAGE</label>

            <div ref={uploadRef} className='image-upload'>
                <div className='image-icon'>
                    <img src={imgIcon} alt="imageIcon" className='camera' />
                </div>
                <span className='image-upload-prompt'>Drop file here or click to upload</span>
                <input ref={uploadInputRef} type="file" name='myFile' className='image-upload-input' accept="image/*" />
            </div>

            <div>
                <button ref={removeButtonRef} className='remove-button'>Remove</button>
            </div>

          </div>
      )
}

export default ImageUpload;