

export const resetImageHelper = (uploadRef, thumbnailElement, setThumb, setPrompt, handlePrompt) => {

        if (thumbnailElement.current.className === 'image-upload-thumb show-thumb') {
            setThumb('image-upload-thumb')
            setPrompt(true)
            handlePrompt()
        };
    };