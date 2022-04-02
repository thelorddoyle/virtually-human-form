import { useState } from "react"
import { DatePicker } from "./DatePicker"
import {defaultValues} from '../helpers/defaultValues'

function Form () {

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
        <div>
            <h1>Settings</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="firstName">First Name
                <input type="text" name='firstName' value={values.firstName} onChange={onChange} />
                </label>
                <br />
                <label htmlFor="lastName">Last Name
                <input value={values.lastName} onChange={onChange} name='lastName' type="text"  />
                </label>
                <br />
                <label htmlFor="email">Email
                <input onChange={onChange} name='email' type="text" value={values.email} />
                </label>
                <br />
                <label htmlFor="phone">Phone
                <input onChange={onChange} name='phone' type="text" value={values.phone} />
                </label>
                <br />
                <DatePicker values={values} convertDate={convertDate} />
                <br />
                <label htmlFor="bio"> Bio
                <br />
                <textarea onChange={onChange} name="bio" value={values.bio} />
                </label>
                <br />
                <button type="submit">Save Changes</button>
                <button onClick={discardChanges}>Discard Changes</button>
            </form>
        </div>
    )
}

export default Form;