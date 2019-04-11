import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from "../../store/actions";
import {connect} from "react-redux";

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder();
    }

    render() {
        let orders = (
            this.props.orders.map(order =>
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            )
        );
        if (this.props.loading) {
            orders = <Spinner/>
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state =>({
    orders: state.order.orders,
    loading: state.order.loading
});

const mapDispatchToProps = (dispatch)=> ({
    onFetchOrder: () => dispatch(actions.fetchOrders())
});

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));
