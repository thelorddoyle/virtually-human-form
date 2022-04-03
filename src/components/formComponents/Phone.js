export const Phone = ({values, onChange, sendValidation}) => {
    
    return(
        <label htmlFor="phone">PHONE*
            <input onChange={onChange} name='phone' type="text" value={values.phone} onBlur={sendValidation} />
            <p className="error"></p>
        </label>
    )
}