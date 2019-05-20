import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import * as actions from '../../../store/actions';
import {Redirect} from 'react-router-dom';

class Logout extends Component{
    componentDidMount(){
        this.props.onLogout();
    }

    render() {
        return (
            <div>
                <Redirect to={"/"}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(actions.authLogout())
});

export default connect(null, mapDispatchToProps)(Logout);
