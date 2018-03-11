import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({
    uri: `http://${process.env.REACT_APP_SERVER_URL}/api/graphql`
})

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}` || null
        }
    })
    return forward(operation)
})

export default new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache()
})
