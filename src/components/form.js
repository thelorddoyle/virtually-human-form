import { useState } from "react"
import { DatePicker } from "./DatePicker"
import ImageUpload from './ImageUpload'

function Form () {

    // in place of an API, this object represents our user
    const defaultValues = {
        firstName: 'Daniel',
        lastName: 'Lord-Doyle',
        email: 'dlorddoyle@gmail.com',
        phone: '(+61) 451 087 593',
        dob: new Date(1988, 9, 14),
        bio: 'lorem ipsum lorem ipsum'
    }

    // state variables
    const [values, setValues] = useState({...defaultValues})

    // change & submit handles
    const onChange = (ev) => {
        setValues({...values, [ev.target.name]: ev.target.value})
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(values)
    }

    // date converter for pulling in values from DatePicker component
    const convertDate = (day, month, year) => {
        let valuesDob = values.dob = new Date(year, month, day)
        setValues({...values, dob: valuesDob})
    }

    // Discard Changes handler
    const discardChanges = () => {
        setValues(defaultValues);
    }

    return(
        <div className="form-grid">

            <div className="form-grid-left">
                <h3>Settings</h3>
                <form onSubmit={onSubmit}>
                    <label htmlFor="firstName">FIRST NAME*
                    <input type="text" name='firstName' value={values.firstName} onChange={onChange} />
                    </label>
                    <label htmlFor="lastName">LAST NAME*
                    <input value={values.lastName} onChange={onChange} name='lastName' type="text"  />
                    </label>
                    <label htmlFor="email">EMAIL*
                    <input onChange={onChange} name='email' type="text" value={values.email} />
                    </label>
                    <label htmlFor="phone">PHONE*
                    <input onChange={onChange} name='phone' type="text" value={values.phone} />
                    </label>
                    <DatePicker values={values} convertDate={convertDate} />
                    <label htmlFor="bio">BIO*
                    <textarea onChange={onChange} name="bio" value={values.bio} />
                    </label>
                    <div className="button-container">
                        <button className="save-button" type="submit"><p>Save Changes</p></button>
                        <button className="discard-button" onClick={discardChanges}><p>Discard</p></button>
                    </div>
                </form>
            </div>

            <div className="form-grid-left">
                <ImageUpload />
            </div>

        </div>
    )
}

export default Form;