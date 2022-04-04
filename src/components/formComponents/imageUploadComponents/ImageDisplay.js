export const ImageDisplay = ({uploadRef, imgIcon, uploadInputRef, removeButtonRef}) => {
    return(
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
    );
};