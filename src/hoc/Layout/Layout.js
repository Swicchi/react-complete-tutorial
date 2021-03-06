import React, {Component} from 'react';
import classes from './Layout.css';
import Aux from '../Aux2/Aux2';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import connect from "react-redux/es/connect/connect";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    show={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>:null}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>);
    };
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.token != null
    }
);

export default connect(mapStateToProps)(Layout);
