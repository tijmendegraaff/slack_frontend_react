import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import PropTypes from 'prop-types'

import HomePage from './HomePage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import DashboardPage from './DashboardPage'
import NotFoundPage from './NotFoundPage'

const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    try {
        jwtDecode(token)
    } catch (err) {
        return false
    }
    return true
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            ))
        }
    />
)

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
            <PrivateRoute path="/dashboard" exact component={DashboardPage} />
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
)

PrivateRoute.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }),
    component: PropTypes.func.isRequired
}

PrivateRoute.defaultProps = {
    location: {
        pathname: ''
    }
}
