export const Phone = ({values, onChange, sendValidation, validationErrors}) => {
    
    return(
        <label htmlFor="phone">PHONE*

            <input 
                aria-label="phoneInput" 
                onChange={onChange} 
                name='phone' 
                type="text" 
                value={values.phone} 
                onBlur={sendValidation}
                className="valid-input"
            />

            <p 
                aria-label="phoneErrorMessage" 
                data-testid="phoneErrorMessage" 
                className="error">

                {validationErrors.phone}

            </p>
            
        </label>
    );
};