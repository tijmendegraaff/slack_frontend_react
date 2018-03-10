import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Register from './Register'
import NotFoundPage from './NotFoundPage'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
)
