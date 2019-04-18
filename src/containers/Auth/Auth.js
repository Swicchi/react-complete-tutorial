import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from './Auth.css';
import * as actions from '../../store/actions';
import connect from "react-redux/es/connect/connect";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, idx) => {
        const control = {
            ...this.state.controls,
            [idx]: {
                ...this.state.controls[idx],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[idx].validation),
                touched: true
            }
        };
        let formIsValid = true;
        for (let key in control) {
            formIsValid = control[key].valid && formIsValid;
        }
        this.setState({controls: control, formIsValid: formIsValid});
    };

    authHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp);
    };

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    };

    render() {
        const input = [];
        for (let key in this.state.controls) {
            input.push(<Input key={key}
                              inputtype={this.state.controls[key].elementType}
                              elementConfig={this.state.controls[key].elementConfig}
                              value={this.state.controls[key].value}
                              invalid={!this.state.controls[key].valid}
                              touched={this.state.controls[key].touched}
                              changed={(event) => this.inputChangedHandler(event, key)}/>)
        }
        let form = (
            <form onSubmit={this.authHandler}>
                {input}
                <Button btnType={"Success"} disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>);
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {form}
                <Button
                    btnType={"Danger"}
                    clicked={this.switchModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        loading: state.auth.loading,
        error: state.auth.error
    }
);

const mapDispatchToProps = dispatch => (
    {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
