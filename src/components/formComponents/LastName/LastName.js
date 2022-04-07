export const LastName = ({values, onChange, sendValidation, validationErrors}) => {
    
    return (
        <label htmlFor="lastName">LAST NAME*

            <input 
                aria-label="lastNameInput" 
                type="text" 
                name="lastName" 
                value={values.lastName} 
                onChange={onChange} 
                onBlur={sendValidation} 
                className="valid-input" 
            />

            <p 
                aria-label="lastNameErrorMessage" 
                data-testid="lastNameErrorMessage" 
                className="error">
                
                {validationErrors}

            </p>

        </label>
    );
};