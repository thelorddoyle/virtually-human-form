import { useState } from "react"
import { DatePicker } from "./formComponents/DatePicker"
import { Validate } from '../helpers/validators'
import { FirstName } from './formComponents/FirstName'
import { LastName } from './formComponents/LastName'
import { Email } from './formComponents/Email'
import { Phone } from './formComponents/Phone'
import { Bio } from './formComponents/Bio'
import { Buttons } from './formComponents/Buttons'
import ImageUpload from './ImageUpload'

function Form () {

    // in place of an API, this object represents our user
    const defaultValues = {
        firstName: 'Daniel',
        lastName: 'Lord-Doyle',
        email: 'dlorddoyle@gmail.com',
        phone: '+61 451 087 593',
        dob: new Date(1988, 9, 14),
        bio: 'lorem ipsum lorem ipsum'
    }

    // state variables
    const [values, setValues] = useState({...defaultValues})
    const [isValid, setIsValid] = useState(true)

    // change & submit handles
    const onChange = (ev) => {
        setValues({...values, [ev.target.name]: ev.target.value})
    }
    
    // date converter for pulling in values from DatePicker component
    const convertDate = (day, month, year) => {
        let valuesDob = values.dob = new Date(year, month, day)
        setValues({...values, dob: valuesDob})
    }
    
    // created this so I could take the ev data from the form field and send it along with setIsValid so that I know if both the field & the form are valid or invalid
    const sendValidation = (ev) => {
        Validate(ev, setIsValid)
    }
    
    // handle submit which will only submit if form is valid
    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(values)
        console.log('IsValid: ', isValid)
    }

    // discard Changes handler
    const discardChanges = () => {
        setValues(defaultValues);
    }

    return(
        <div className="form-grid">

            <div className="form-grid-left">
                <h3>Settings</h3>
                <form onSubmit={onSubmit}>

                    <FirstName values={values} onChange={onChange} sendValidation={sendValidation} />

                    <LastName values={values} onChange={onChange} sendValidation={sendValidation} />

                    <Email values={values} onChange={onChange} sendValidation={sendValidation} />

                    <Phone values={values} onChange={onChange} sendValidation={sendValidation} />

                    <DatePicker values={values} convertDate={convertDate} />

                    <Bio values={values} onChange={onChange} sendValidation={sendValidation} />

                    <Buttons discardChanges={discardChanges} />

                </form>
            </div>

            <div className="form-grid-right">
                <ImageUpload />
            </div>

        </div>
    )
}

export default Form;