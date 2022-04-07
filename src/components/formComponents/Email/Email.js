export const Email = ({values, onChange, sendValidation, validationErrors}) => {
    
    return(
        <label htmlFor="email">EMAIL*

            <input 
                aria-label="emailInput" 
                type="text" 
                name="email"
                value={values.email} 
                onChange={onChange} 
                onBlur={sendValidation}
                className="valid-input"
            />

            <p 
                aria-label="emailErrorMessage" 
                data-testid="emailErrorMessage" 
                className="error">
                
                {validationErrors.email}
                
            </p>

        </label>
    );
};