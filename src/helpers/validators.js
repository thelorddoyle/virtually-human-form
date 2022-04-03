export const Validate = (ev, setIsValid) => {

    // common variables
    const fieldName = ev.target.name;
    const fieldValue = ev.target.value;
    const fieldSplit = ev.target.value.split('').length;

    // RegEx tests
    // this email RegEx has been deemed the most effective email validator available but comes with some quite sticky escape characters that eslint does not like
    // eslint-disable-next-line no-control-regex
    const emailTest = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
    // this is only a valid RegEx for Australian phone numbers
    const phoneTest = new RegExp(/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/);
    // this checks if the field is ONLY space characters
    const spaceTest = new RegExp(/.*[^ ].*/);
    // this checks for spaces at the beginning and end of the field
    const startAndEndTest = new RegExp(/^\S+(?: \S+)*$/);
    // This is looking for a valid name, without numbers in etc
    const nameTest = new RegExp(/^[a-z ,.'-]+$/i);

    // working validations
    let errorMsg = '';

    if (fieldName === 'firstName') {
        let firstName = fieldValue;
        if (fieldSplit === 0) {
            errorMsg = 'This field is required';
        } else if (!nameTest.test(firstName)) {
            errorMsg = 'This is an invalid name';
        } else if (!spaceTest.test(firstName)) {
            errorMsg = 'Name cannot contain only spaces';
        } else if (!startAndEndTest.test(firstName)) {
            errorMsg = 'Name cannot contain begin or end with space character';
        }
    }

    if (fieldName === 'lastName') {
        let lastName = fieldValue;
        if (fieldSplit === 0) {
            errorMsg = 'This field is required';
        } else if (!nameTest.test(lastName)) {
            errorMsg = 'This is an invalid name';
        } else if (!spaceTest.test(lastName)) {
            errorMsg = 'Name cannot contain only spaces';
        } else if (!startAndEndTest.test(lastName)) {
            errorMsg = 'Name cannot contain begin or end with space character';
        }
    } 

    if (fieldName === 'email') {
        let email = fieldValue;
        if (fieldSplit === 0) {
            errorMsg = 'This field is required';
        } else if (!emailTest.test(email)) {
            errorMsg = 'Please use a valid email';
        } else if (!startAndEndTest.test(email)) {
            errorMsg = 'Email cannot contain begin or end with space character';
        }
    }

    if (fieldName === 'phone') {
        let phone = fieldValue;
        if (fieldSplit === 0) {
            errorMsg = 'This field is required'
        } else if (!phoneTest.test(phone)) {
            errorMsg = 'Please use a valid phone number';
        }
    }

    if (fieldName === 'bio') {
        if (fieldSplit === 0) {
            errorMsg = 'This field is required';
        }
    }

    // if there is an error found in validations, show in the Form component. If not, reset Form field to remove error if there is one
    if (errorMsg !== '') {
        ev.target.nextElementSibling.textContent = errorMsg;
        ev.target.className = 'error-field';
        setIsValid(false)
    } else {
        ev.target.nextElementSibling.textContent = '';
        ev.target.className = '';
        setIsValid(true)
    }
}