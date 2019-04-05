import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import {connect} from 'react-redux'
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
    /*constructor(props){
        super(props);
        this.state={

        }
    }*/

    state = {
        purchasing: false
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        /*const data = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(1)
        };
        axios.post('/burger', data)
            .then(response => {
                console.log(response.data);
                alert("You should pay: $"+response.data.price+"");
                this.setState({purchasing: false});
            }).catch(error => {
            console.log(error);
            this.setState({purchasing: false});
        });*/
       /* this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
       const queryParams = [];
       for (let i in this.props.ing){
           queryParams.push(encodeURIComponent(i)+ '='+ encodeURIComponent(this.props.ing[i]));
       }
       queryParams.push('price=' + this.props.totalPrice);
       const queryString = queryParams.join('&');*/
       this.props.history.push({
           pathname:'/checkout'
         //  search:'?'+queryString
       });
    };

    componentDidMount() {

        /*axios.get('/orders.json')
            .then(response => {
                console.log(response.data);
            }).catch(error => {
            console.log(error);
        });*/
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    addIngredientHandler = (type) => {
        //const oldCount = this.state.ingredients[type];
        //const updateCount = oldCount + 1;
        //const updateIngredients = {
        //    ...this.state.ingredients
        //};
        //updateIngredients[type] = updateCount;
        //const priceAddition = INGREDIENT_PRICES[type];
        //const oldPrice = this.state.totalPrice;
        //const newPrice = oldPrice + priceAddition;
        //this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        //this.updatePurchaseState(updateIngredients);
        this.props.onIngredientAdded(type);
    };

    removeIngredientHandler = (type) => {
        //const oldCount = this.state.ingredients[type];
        //if (oldCount === 0) {
        //    return null;
        //}
        //const updateCount = oldCount - 1;
        //const updateIngredients = {
        //    ...this.state.ingredients
        //};
        //updateIngredients[type] = updateCount;
        //const priceAddition = INGREDIENT_PRICES[type];
        //const oldPrice = this.state.totalPrice;
        //const newPrice = oldPrice - priceAddition;
        //this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        //this.updatePurchaseState(updateIngredients);
        this.props.onIngredientRemoved(type);
    };

    render() {
        const disabledInfo = {
            ...this.props.ing
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ?
            <p style={{textAlign: 'center'}}>
                <strong>Ingredients can't be loaded!</strong>
            </p> : <Spinner/>;
        if (this.props.ing) {
            burger =
                <Aux>
                    <div style={{overflow:'scroll'}}>
                        <Burger ingredients={this.props.ing}/>
                    </div>
                    <BuildControls addIngredient={this.addIngredientHandler}
                                   removeIngredient={this.removeIngredientHandler}
                                   disabled={disabledInfo}
                                   clicked={this.purchaseHandler}
                                   purchaseable={this.updatePurchaseState(this.props.ing)}
                                   price={this.props.totalPrice}/>
                </Aux>;
            orderSummary = <OrderSummary
                ingredients={this.props.ing}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.totalPrice}/>;
        }


        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>(
    {
        ing:state.ingredients,
        totalPrice:state.totalPrice
    }
);

const mapDispatchToProps = dispatch =>(
    {
        onIngredientAdded:(name)=>dispatch(burgerBuilderActions.addIngredient(name)),
        onIngredientRemoved:(name)=>dispatch(burgerBuilderActions.removeIngredient(name))
    }
);

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
