import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: $<strong>{props.price.toFixed(1)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.addIngredient(ctrl.type)}
                    removed={() => props.removeIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}/>
            ))}
            <button
                onClick={props.clicked}
                className={classes.OrderButton}
            disabled={!props.purchaseable}>ORDER NOW</button>
        </div>
    );
};

export default buildControls;
