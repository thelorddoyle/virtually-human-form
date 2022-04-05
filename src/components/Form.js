import { useEffect, useState } from "react"
import { DatePicker } from "./formComponents/datePickerComponents/DatePicker"
import { Validate } from '../helpers/validators'
import { SuccessBanner } from './formComponents/SuccessBanner'
import { FirstName } from './formComponents/FirstName'
import { LastName } from './formComponents/LastName'
import { Email } from './formComponents/Email'
import { Phone } from './formComponents/Phone'
import { Bio } from './formComponents/Bio'
import { Buttons } from './formComponents/Buttons'
import ImageUpload from './formComponents/imageUploadComponents/ImageUpload'

function Form () {

    // in place of an API, this object represents our user
    const defaultValues = {
        firstName: 'Daniel',
        lastName: 'Lord-Doyle',
        email: 'dlorddoyle@gmail.com',
        phone: '+61 451 087 593',
        dob: new Date(1988, 9, 14),
        bio: 'lorem ipsum lorem ipsum',
        img: null
    };

    // state variables
    const [values, setValues] = useState({...defaultValues});
    const [isValid, setIsValid] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [image, setImage] = useState('');

    // this useEffect listens for a change in the image from the imageUpload and gives it to our values state
    useEffect(() => {
        if (image) {
            setValues({...values, img: image.img});
        } else {
            setValues({...values, img: null})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    // change & submit handles
    const onChange = (ev) => {
        setValues({...values, [ev.target.name]: ev.target.value});
    };
    
    // date converter for pulling in values from DatePicker component
    const convertDate = (day, month, year) => {
        let valuesDob = values.dob = new Date(year, month, day);
        setValues({...values, dob: valuesDob});
    };
    
    // created this so I could take the ev data from the form field and send it along with setIsValid so that I know if both the field & the form are valid or invalid
    const sendValidation = (ev) => {
        Validate(ev, setIsValid, setIsSuccess);
    };
    
    // handle submit which will only submit if form is valid
    const onSubmit = (ev) => {
        ev.preventDefault();

        if (isValid) {
            console.log(values);
            setIsSuccess(true);
        } else {
            setIsSuccess(false);
        }
    };

    // discard Changes handler
    const discardChanges = (ev) => {
        ev.preventDefault();
        setImage(null);
        setValues(defaultValues);
    };

    return(
        <>

            <SuccessBanner isSuccess={isSuccess} />

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
                    <ImageUpload image={image} setImage={setImage} />
                </div>

            </div>
        </>
    );
};

export default Form;