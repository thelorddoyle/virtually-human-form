export const Buttons = ({discardChanges}) => {
    
    return(
        <div className="button-container">
            <button className="save-button" type="submit"><p>Save Changes</p></button>
            <button className="discard-button" onClick={discardChanges}><p>Discard</p></button>
        </div>
    )
}