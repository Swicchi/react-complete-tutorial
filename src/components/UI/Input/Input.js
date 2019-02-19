import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    switch (props.inputtype) {
        case ('input'):
            inputElement = <input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        case ('textArea'):
            inputElement = <textarea onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        case ('select'):
            inputElement = <select onChange={props.changed} className={classes.InputElement} value={props.value}>
                {props.elementConfig.options.map(option =>
                    (
                        <option onClick={props.changed} value={option.value}>
                            {option.displayValue}
                        </option>
                    )
                )}
            </select>;
            break;
        default:
            inputElement = <input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input
