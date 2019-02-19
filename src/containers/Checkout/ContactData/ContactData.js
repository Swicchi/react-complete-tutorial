import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 10,
                    minLength: 3,
                },
                valid: true
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: true
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: true
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP Code'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: true
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: true
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        }, {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }]
                },
                value: '',
                validation:{},
                valid: true
            }
        },
        loading: false
    };

    checkValidaty(value, rules) {
        let isValid = true;
        if(rules.required){
            isValid = isValid&&value.trim()!== '';
        }
        if(rules.minLength){
            isValid = isValid&&value.length>=rules.minLength;
        }
        if(rules.maxLength){
            isValid = isValid&&value.length<=rules.maxLength;
        }
        return isValid;
    }

    inputChangedHandler = (event, idx) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedOrderFormElement = {...updatedOrderForm[idx]};
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidaty(updatedOrderFormElement.value,updatedOrderFormElement.validation)
        updatedOrderForm[idx] = updatedOrderFormElement;
        this.setState({orderForm: updatedOrderForm});
    };

    orderHandler = (event) => {
        event.preventDefault();
        /*const data = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(1)
        };
        axios.post('/burger', data)
            .then(response => {
                console.log(response.data);
                alert("You should pay: $" + response.data.price + "");
                this.setState({purchasing: false});
            }).catch(error => {
            console.log(error);
            this.setState({purchasing: false});
        });*/
        this.setState({loading: true});
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/orders');
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error)
            });
    };

    render() {
        const input = [];
        for (let key in this.state.orderForm) {
            input.push(<Input key={key}
                              inputtype={this.state.orderForm[key].elementType}
                              elementConfig={this.state.orderForm[key].elementConfig}
                              value={this.state.orderForm[key].value}
                              invalid={!this.state.orderForm[key].valid}
                              changed={(event) => this.inputChangedHandler(event, key)}/>)
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {input}
                <Button btnType={"Success"} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
