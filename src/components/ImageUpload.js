import imgIcon from '../images/imgIcon.png'

import React, { useEffect } from 'react';

const ImageUpload = ({setImage, resetImage, setResetImage}) => {

    let imageUploadElement;
    let inputElement;
    let removeButton;
    
    // this useEffect triggers on the first render, so that after render I can obtain my elements to use later
    // TODO: complete transfer to useRef
    useEffect(() => {
        // get the drop zone element for the image upload
        imageUploadElement = document.querySelector('.image-upload');

        // get the input element itself
        inputElement = document.querySelector('.image-upload-input');

        // enable click event on the dropzone as if it was the input element
        imageUploadElement.addEventListener('click', e => {
            inputElement.click();
        })

        removeButton = document.querySelector('.remove-button')
    }, [])
    
    useEffect(() => {

        // get all event types for drag, so we can change border at relevant times
        let dragOptions = ['dragend', 'dragleave']

        // to turn border solid when we drag over
        imageUploadElement.addEventListener('dragover', e => {
            e.preventDefault()
            imageUploadElement.classList.add('image-upload-over');
        })

        // this uses the dragOptions to ensure we have the correct behaviour for the border
        dragOptions.forEach(type => {
            imageUploadElement.addEventListener(type, e => {
                imageUploadElement.classList.remove('image-upload-over')
            })
        })

        // handles file being stored in to inputElement.files when an image is dropped on to the imageUploadElement
        imageUploadElement.addEventListener('drop', e => {
            e.preventDefault()
            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateThumbnail(imageUploadElement, e.dataTransfer.files[0])
            }

            imageUploadElement.classList.remove('image-upload-over');
        })

        function updateThumbnail(imageUploadElement, file) {
            let thumbnailElement = imageUploadElement.querySelector('.image-upload-thumb');

            // first time, remove the prompt
            if (imageUploadElement.querySelector('.image-upload-prompt')) {
                imageUploadElement.querySelector('.image-upload-prompt').remove();
            }

            // first time round, there won't be one so we have to make it
            if (!thumbnailElement) {
                thumbnailElement = document.createElement('div');
                thumbnailElement.classList.add('image-upload-thumb');
                imageUploadElement.appendChild(thumbnailElement);
            }

            // show actual thumbnail image
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    thumbnailElement.style.backgroundImage = `url('${reader.result}')`
                    setImage({img: `url('${reader.result}')`})
                }
            } else {
                thumbnailElement.style.backgroundImage = null;
            }

        }

        inputElement.addEventListener('change', e => {
            if (inputElement.files.length) {
                updateThumbnail(imageUploadElement, inputElement.files[0])
            }
        })

        removeButton.addEventListener('click', e => {
            let thumbnailElement = imageUploadElement.querySelector('.image-upload-thumb');

            if (thumbnailElement) {
                imageUploadElement.querySelector('.image-upload-thumb').remove();
                let promptElement = document.createElement('span');
                promptElement.classList.add('image-upload-prompt');
                promptElement.textContent = 'Drop file here or click to upload'
                imageUploadElement.appendChild(promptElement);
            }

        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageUploadElement, inputElement, removeButton])

    useEffect(() => {
        let imageElement = document.querySelector('.image-upload')
        let thumbnailElement = imageElement.querySelector('.image-upload-thumb');

        if (resetImage) {
            if (thumbnailElement) {
                imageElement.querySelector('.image-upload-thumb').remove();
                let promptElement = document.createElement('span');
                promptElement.classList.add('image-upload-prompt');
                promptElement.textContent = 'Drop file here or click to upload'
                imageElement.appendChild(promptElement);
            }
        setResetImage(false)
        }



    }, [resetImage, setResetImage])

      return (
          <div data-testid="image-container" className='image-container' >

            <label className='image-label'>IMAGE</label>

            <div className='image-upload'>
                <div className='image-icon'>
                    <img src={imgIcon} alt="imageIcon" className='camera' />
                </div>
                <span className='image-upload-prompt'>Drop file here or click to upload</span>
                <input type="file" name='myFile' className='image-upload-input' accept="image/*" />
            </div>

            <div>
                <button className='remove-button'>Remove</button>
            </div>

          </div>
      )

}

export default ImageUpload;