import React, { useRef, useState } from "react";
import styles from '../css/Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true,
    });

    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    const handleConfirm = (event) => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPostal = postalRef.current.value;
        const enteredCity = cityRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const cityIsValid = !isEmpty(enteredCity);
        const postalIsValid = isFiveChars(enteredPostal);

        setFormValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postal: postalIsValid
        });

        const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

        

        if(!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        })

    }

    const nameClasses = `${styles.control} ${formValidity.name ? '' : styles.invalid}`
    const streetClasses = `${styles.control} ${formValidity.street ? '' : styles.invalid}`
    const postalClasses = `${styles.control} ${formValidity.postal ? '' : styles.invalid}`
    const cityClasses = `${styles.control} ${formValidity.city ? '' : styles.invalid}`

    return (
        <form className={styles.form} onSubmit={handleConfirm}>
            <div className={nameClasses}> 
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameRef}/>
                {!formValidity.name && <p>Please enter a valid Name.</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetRef}/>
                {!formValidity.street && <p>Please enter a valid Street.</p>}
            </div>
            <div className={postalClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalRef}/>
                {!formValidity.postal && <p>Please enter a valid Postal Code (5 Characters long).</p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityRef}/>
                {!formValidity.city && <p>Please enter a valid City.</p>}
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
}
 
export default Checkout;