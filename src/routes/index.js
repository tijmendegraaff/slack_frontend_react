import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HomePage from './HomePage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import NotFoundPage from './NotFoundPage'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
)
