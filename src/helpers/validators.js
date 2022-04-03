import { emailTest, phoneTest, spaceTest, startAndEndTest, nameTest } from './regExTests'

export const Validate = (ev, setIsValid) => {

    // common variables
    const fieldName = ev.target.name;
    const fieldValue = ev.target.value;
    const fieldSplit = ev.target.value.split('').length;

    // working validations
    let errorMsg = '';

    // If you need to create a new field in the form, simply add a error message reference list below that validates that specific form and provides correct error messaging

    // error messages for firstName
    if (fieldName === 'firstName' || fieldName === 'lastName') {
        if (!nameTest.test(fieldValue)) {
            errorMsg = 'This is an invalid name';
        }
    } // end of error messages for firstName

    // error messages for email
    if (fieldName === 'email') {
        let email = fieldValue;
        if (!emailTest.test(email)) {
            errorMsg = 'Please use a valid email';
        }
    } // end of error messages for email

    // error messages for phone
    if (fieldName === 'phone') {
        let phone = fieldValue;
        if (!phoneTest.test(phone)) {
            errorMsg = 'Please use a valid phone number';
        }
    } // end of error messages for phone

    if (fieldName !== '') {
        if (fieldSplit === 0) {
            errorMsg = 'This field is required';
        }  else if (!spaceTest.test(fieldValue)) {
            errorMsg = 'Field cannot contain only spaces';
        } else if (!startAndEndTest.test(fieldValue)) {
            errorMsg = 'Field cannot begin or end with space character';
        }
    }

    // error or success conditional
    // if there is an error found in validations, show in the Form component. If not, reset Form field to remove error if there is one
    if (errorMsg !== '') {
        ev.target.nextElementSibling.textContent = errorMsg;
        ev.target.className = 'error-field';
        // by setting isValid (in Form component) as false, the form will not be able to be saved
        setIsValid(false)
    } else {
        ev.target.nextElementSibling.textContent = '';
        ev.target.className = '';
        // by setting isValid (in Form component) as true, the form can be saved and success message can be shown
        setIsValid(true)
    }
}