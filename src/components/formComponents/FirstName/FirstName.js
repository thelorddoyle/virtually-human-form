export const FirstName = ({values, onChange, sendValidation, validationErrors}) => {
    
    return(
        <label htmlFor="firstName">FIRST NAME*

            <input 
                aria-label="firstNameInput" 
                type="text" 
                name="firstName" 
                value={values.firstName} 
                onChange={onChange} 
                onBlur={sendValidation} 
                className="valid-input"
            />

            <p 
                aria-label="firstNameErrorMessage" 
                data-testid="firstNameErrorMessage" 
                className="error">
                
                {validationErrors}
                
            </p>

        </label>
    );
};