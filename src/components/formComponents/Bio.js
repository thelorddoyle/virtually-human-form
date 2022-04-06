export const Bio = ({values, onChange, sendValidation}) => {
    
    return(
        <label htmlFor="bio">BIO*
        <textarea aria-label="bioInput" onChange={onChange} name="bio" value={values.bio} onBlur={sendValidation} />
        <p className="error"></p>
    </label>
    );
};