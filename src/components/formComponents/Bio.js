export const Bio = ({values, onChange, sendValidation, validationErrors}) => {
    
    return(
        <label htmlFor="bio">BIO*

            <textarea 
                aria-label="bioInput"
                type="text"
                name="bio"
                value={values.bio} 
                onChange={onChange} 
                onBlur={sendValidation}
                className="valid-input"
            />

            <p 
                aria-label="firstNameErrorMessage" 
                data-testid="firstNameErrorMessage" 
                className="error">

                {validationErrors.bio}

            </p>
            
        </label>
    );
};