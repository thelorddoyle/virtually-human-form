export const updateThumbnail = (thumbnailElement, file, setImage, setThumb, setPrompt ) => {
    
    // first time, remove the prompt and show the thumbnail element
    if (thumbnailElement.current.classList.length === 1) {
        setThumb('image-upload-thumb show-thumb')
        setPrompt('hide')
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