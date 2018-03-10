import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import 'normalize.css/normalize.css'

import './styles/styles.scss'
import client from './apollo'
import Routes from './routes'

const App = (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
)

ReactDOM.render(App, document.getElementById('app'))
