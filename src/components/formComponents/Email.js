export const Email = ({values, onChange, sendValidation}) => {
    
    return(
        <label htmlFor="email">EMAIL*
            <input aria-label="emailInput" onChange={onChange} name='email' type="text" value={values.email} onBlur={sendValidation} />
            <p className="error"></p>
        </label>
    );
};