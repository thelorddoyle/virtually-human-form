export const FirstName = ({values, onChange, sendValidation}) => {
    
    return(
        <label htmlFor="firstName">FIRST NAME*
            <input type="text" name='firstName' value={values.firstName} onChange={onChange} onBlur={sendValidation} />
            <p className="error"></p>
        </label>
    );
};