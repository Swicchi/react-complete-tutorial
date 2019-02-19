import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if(props.invalid){
        inputClasses.push(classes.Invalid)
    }
    switch (props.inputtype) {
        case ('input'):
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
        case ('textArea'):
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
        case ('select'):
            inputElement = <select onChange={props.changed} className={inputClasses.join(' ')} value={props.value}>
                {props.elementConfig.options.map(option =>
                    (<option key={option.value} onClick={props.changed} value={option.value}>
                            {option.displayValue}
                        </option>)
                )}
            </select>;
            break;
        default:
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
    }
    let validationError = null;
    if (props.invalid ) {
        validationError = <p>Please enter a valid value!</p>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input
