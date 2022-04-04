export const LastName = ({values, onChange, sendValidation}) => {
    
    return (
        <label htmlFor="lastName">LAST NAME*
            <input value={values.lastName} onChange={onChange} name='lastName' type="text" onBlur={sendValidation} />
            <p className="error"></p>
        </label>
    );
};