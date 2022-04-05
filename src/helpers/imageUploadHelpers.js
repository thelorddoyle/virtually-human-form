export const updateThumbnail = (thumbnailElement, file, setImage, setThumb, setPrompt, handlePrompt) => {
    
    // first time, remove the prompt
    if (thumbnailElement.current.classList.length === 1) {
        setThumb('image-upload-thumb show-thumb')
        setPrompt(false)
        handlePrompt()
    };
    
    // show actual thumbnail image
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.current.style.backgroundImage = `url('${reader.result}')`;
            setImage({img: `url('${reader.result}')`});
        }
    } else {
        thumbnailElement.style.backgroundImage = null;
    };
};

export const resetImageHelper = (uploadRef, thumbnailElement, setThumb, setPrompt, handlePrompt) => {
    if (thumbnailElement.current.className === 'image-upload-thumb show-thumb') {
        thumbnailElement.current.style.backgroundImage = ''
        setThumb('image-upload-thumb')
        setPrompt(true)
        handlePrompt()
    };
};