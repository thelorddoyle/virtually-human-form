export const updateThumbnail = (imageUploadElement, file, setImage) => {

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
};

export const resetImageHelper = (uploadRef) => {

    let thumbnailElement = uploadRef.current.querySelector('.image-upload-thumb');

        if (thumbnailElement) {
            uploadRef.current.querySelector('.image-upload-thumb').remove();
            let promptElement = document.createElement('span');
            promptElement.classList.add('image-upload-prompt');
            promptElement.textContent = 'Drop file here or click to upload'
            uploadRef.current.appendChild(promptElement);
        }
    }