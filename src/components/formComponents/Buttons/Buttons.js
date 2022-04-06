export const Buttons = ({discardChanges}) => {
    
    return(
        <div data-testid="button-container" className="button-container">
            <button data-testid="save-button" className="save-button" type="submit"><p>Save Changes</p></button>
            <button data-testid="discard-button" className="discard-button" onClick={discardChanges}><p>Discard</p></button>
        </div>
    );
};