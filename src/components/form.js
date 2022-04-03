import { useState } from "react"
import { DatePicker } from "./DatePicker"
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
    const [isFormValid, setIsFormValid] = useState(true)
    const [firstNameErrors, setFirstNameErrors] = useState('')
    const [lastNameErrors, setLastNameErrors] = useState('')
    const [emailErrors, setEmailErrors] = useState('')
    const [phoneErrors, setPhoneErrors] = useState('')
    const [bioErrors, setBioErrors] = useState('')

    // change & submit handles
    const onChange = (ev) => {
        setValues({...values, [ev.target.name]: ev.target.value})
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        if (isFormValid) {
            console.log(values)
            console.log('Form is valid')
        } else {
            console.log('Form is invalid')
        }
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

    const validate = (ev) => {

        // common variables
        const fieldName = ev.target.name;
        const fieldValue = ev.target.value;
        const fieldSplit = ev.target.value.split('').length;

        // RegEx tests
        const spaceTest = new RegExp(/.*[^ ].*/);
        const startAndEndTest = new RegExp(/^\S+(?: \S+)*$/);
        const nameTest = new RegExp(/^[a-z ,.'-]+$/i);
        // the following RegEx has been deemed the most effective email validator available but comes with some quite sticky escape characters that eslint does not like
        // eslint-disable-next-line no-control-regex
        const emailTest = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
        const phoneTest = new RegExp(/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/)

        const createError = () => {
            ev.target.className = 'error-field';
            setIsFormValid(false);
        }

        const removeError = () => {
            ev.target.className = '';
            setIsFormValid(true);
        }

        if (fieldName === 'firstName') {
            let firstName = fieldValue;
            if (fieldSplit === 0) {
                setFirstNameErrors('This field is required');
                createError();
            } else if (!nameTest.test(firstName)) {
                setFirstNameErrors('This is an invalid name');
                createError();
            } else if (!spaceTest.test(firstName)) {
                setFirstNameErrors('Cannot contain only spaces');
                createError();
            } else if (!startAndEndTest.test(firstName)) {
                setFirstNameErrors('Cannot begin or end name with a space.');
                createError();
            } else {
                setFirstNameErrors('');
                removeError();
            }
        }

        if (fieldName === 'lastName') {
            let lastName = fieldValue
            if (fieldSplit === 0) {
                setLastNameErrors('This field is required')
                createError()
            } else if (!nameTest.test(lastName)) {
                setLastNameErrors('This is an invalid name')
                createError()
            } else if (!spaceTest.test(lastName)) {
                setLastNameErrors('Cannot contain only spaces');
                createError();
            } else if (!startAndEndTest.test(lastName)) {
                setLastNameErrors('Cannot begin or end name with a space')
                createError()
            } else {
                setLastNameErrors('')
                removeError()
            }
        } 

        if (fieldName === 'email') {
            let email = fieldValue;
            if (fieldSplit === 0) {
                setEmailErrors('This field is required');
                createError();
            } else if (!emailTest.test(email)) {
                setEmailErrors('Please use a valid email address');
                createError();
            } else if (!startAndEndTest.test(email)) {
                setEmailErrors('Cannot begin or end email with a space');
                createError();
            } else {
                setEmailErrors('');
                removeError();
            }
        }

        if (fieldName === 'phone') {
            let phone = fieldValue;
            if (fieldSplit === 0) {
                setPhoneErrors('This field is required');
                createError();
            } else if (!phoneTest.test(phone)) {
                setPhoneErrors('Please enter a valid phone number');
                createError();
            } else {
                setPhoneErrors('');
                removeError();
            }
        }

        if (fieldName === 'bio') {
            let bio = fieldValue;
            if (fieldSplit === 0) {
                setBioErrors('This field is required');
                createError();
            } else {
                setBioErrors('');
                removeError();
            }
        }
    }

    return(
        <div className="form-grid">

            <div className="form-grid-left">
                <h3>Settings</h3>
                <form onSubmit={onSubmit}>
                    <label htmlFor="firstName">FIRST NAME*
                    <input type="text" name='firstName' value={values.firstName} onChange={onChange} onBlur={validate} />
                    <p className="error">{firstNameErrors}</p>
                    </label>
                    <label htmlFor="lastName">LAST NAME*
                    <input value={values.lastName} onChange={onChange} name='lastName' type="text" onBlur={validate} />
                    <p className="error">{lastNameErrors}</p>
                    </label>
                    <label htmlFor="email">EMAIL*
                    <input onChange={onChange} name='email' type="text" value={values.email} onBlur={validate} />
                    <p className="error">{emailErrors}</p>
                    </label>
                    <label htmlFor="phone">PHONE*
                    <input onChange={onChange} name='phone' type="text" value={values.phone} onBlur={validate} />
                    <p className="error">{phoneErrors}</p>
                    </label>
                    <DatePicker values={values} convertDate={convertDate} />
                    <label htmlFor="bio">BIO*
                    <textarea onChange={onChange} name="bio" value={values.bio} onBlur={validate} />
                    <p className="error">{bioErrors}</p>
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