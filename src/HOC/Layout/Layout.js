import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import Dashboard from '../../containers/Dashboard/Dashboard';
import SignUp from '../../containers/SignUp/SignUp';
import Login from '../../containers/Login/Login';
import COnfirmEmail from '../../containers/EmailConfirmation/ConfirmEmail';
import ForgotPassword from '../../containers/ForgotPassword/ForgotPassword';
import ResetPassword from '../../containers/ResetPassword/ResetPassword';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import Aux from '../Aux/Aux';

class Layout extends Component {
    render() {
        return (
            <Aux>
                 <Router>
                 <Route exact={true} path="/dashboard" component={Dashboard} />
                 <Route exact={true} path="/" component={Login} />
                 <Route exact={true} path="/login" component={Login} />
                 <Route exact={true} path="/signup" component={SignUp} />
                 <Route exact={true} path="/verify-code" component={COnfirmEmail} />
                 <Route exact={true} path="/forgot-password" component={ForgotPassword} />
                 <Route exact={true} path="/reset-password" component={ResetPassword} />        
                </Router>
            </Aux>
        );
    }
}

export default Layout;