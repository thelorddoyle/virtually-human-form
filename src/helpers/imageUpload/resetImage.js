export const resetImageHelper = ( thumb, thumbnailElement, setThumb, setPrompt ) => {
    // if thumbnail image is showing, set the background to null and reset the display for prompt
    if (thumb === 'image-upload-thumb show-thumb') {
        thumbnailElement.current.style.backgroundImage = null
        setThumb('image-upload-thumb')
        setPrompt('image-upload-prompt')
    };
};