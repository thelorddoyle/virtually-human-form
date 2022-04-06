import { emailTest, phoneTest, spaceTest, startAndEndTest, nameTest } from './regExTests'

export const defaultErrors = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    dob: null,
    bio: null,
}

export const Validate = (ev, setIsValid, setIsSuccess, validationErrors, setValidationErrors) => {

    // common variables
    const field = ev.target
    const fieldName = ev.target.name;
    const fieldValue = ev.target.value;
    const fieldSplit = ev.target.value.split('').length;

    // If you need to create a new field in the form, simply add a error message reference list below that validates that specific form and provides correct error messaging
    let validationErrorPresent = false;

    // error messages for firstName
    if (fieldName === 'firstName' || fieldName === 'lastName') {
        if (!nameTest.test(fieldValue)) {
            setValidationErrors({...validationErrors, [fieldName]: 'This is an invalid name'})
            validationErrorPresent = true;
        }
    }; // end of error messages for firstName

    // error messages for email
    if (fieldName === 'email') {
        let email = fieldValue;
        if (!emailTest.test(email)) {
            setValidationErrors({...validationErrors, [fieldName]: 'This is an invalid email'})
            validationErrorPresent = true;
        }
    }; // end of error messages for email

    // error messages for phone
    if (fieldName === 'phone') {
        let phone = fieldValue;
        if (!phoneTest.test(phone)) {
            setValidationErrors({...validationErrors, [fieldName]: 'Please use a valid phone number'})
            validationErrorPresent = true;
        }
    }; // end of error messages for phone

    if (fieldName !== '') {
        if (fieldSplit === 0) {
            setValidationErrors({...validationErrors, [fieldName]: 'This field is required'})
            validationErrorPresent = true;
        }  else if (!spaceTest.test(fieldValue)) {
            setValidationErrors({...validationErrors, [fieldName]: 'Field cannot contain only spaces'})
            validationErrorPresent = true;
        } else if (!startAndEndTest.test(fieldValue)) {
            setValidationErrors({...validationErrors, [fieldName]: 'Field cannot begin or end with space character'})
            validationErrorPresent = true;
        };
    };

    // // error or success conditional
    // // if there is an error found in validations, show in the Form component. If not, reset Form field to remove error if there is one
    // by setting isValid (in Form component) as false, the form will not be able to be saved
    if (validationErrorPresent) {
        field.className = 'error-field';
        setIsValid(false);
        setIsSuccess(false);
    } else {
        setValidationErrors({...validationErrors, [fieldName]: null})
        field.className = 'valid-input';
        setIsValid(true);
        setIsSuccess(false);
    };

};