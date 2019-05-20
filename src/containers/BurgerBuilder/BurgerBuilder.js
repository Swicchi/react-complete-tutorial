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
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else {
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout'
            //  search:'?'+queryString
        });
    };

    componentDidMount() {
        this.props.onInitIngredient();
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
        this.props.onIngredientAdded(type);
    };

    removeIngredientHandler = (type) => {
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

        let burger = this.props.error ?
            <p style={{textAlign: 'center'}}>
                <strong>Ingredients can't be loaded!</strong>
            </p> : <Spinner/>;
        if (this.props.ing) {
            burger =
                <Aux>
                    <div style={{overflow: 'scroll'}}>
                        <Burger ingredients={this.props.ing}/>
                    </div>
                    <BuildControls addIngredient={this.addIngredientHandler}
                                   removeIngredient={this.removeIngredientHandler}
                                   disabled={disabledInfo}
                                   clicked={this.purchaseHandler}
                                   purchaseable={this.updatePurchaseState(this.props.ing)}
                                   price={this.props.totalPrice}
                                   isAuth={this.props.isAuthenticated}/>
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

const mapStateToProps = state => (
    {
        ing: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token!=null
    }
);

const mapDispatchToProps = dispatch => (
    {
        onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
        onInitIngredient: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
