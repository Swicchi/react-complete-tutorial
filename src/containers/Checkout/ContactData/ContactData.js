import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
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
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Remigio Fernández',
                address: {
                    street: 'Los Alamos 12524',
                    zipCode: '41351',
                    country: 'Chile'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error)
            });
    };

    render() {
        let form = (
            <form>
                <input className={classes.Input} type={"text"} name={"name"} placeholder={"Your Name"}/>
                <input className={classes.Input} type={"email"} name={"email"} placeholder={"Your Email"}/>
                <input className={classes.Input} type={"text"} name={"street"} placeholder={"Your Street"}/>
                <input className={classes.Input} type={"text"} name={"postal"} placeholder={"Your Postal"}/>
                <Button btnType={"Success"} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading){
            form=<Spinner/>
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
