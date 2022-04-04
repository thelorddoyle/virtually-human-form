export const Email = ({values, onChange, sendValidation}) => {
    
    return(
        <label htmlFor="email">EMAIL*
            <input onChange={onChange} name='email' type="text" value={values.email} onBlur={sendValidation} />
            <p className="error"></p>
        </label>
    );
};