import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat, split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'
import absinthSocketLink from './absintheSocketLink'

const httpLink = new HttpLink({
    uri: `http://${process.env.REACT_APP_SERVER_URL}/api/graphql`
})

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}` || null
        }
    })
    return forward(operation)
})

const httpLinkWithMiddleware = concat(authMiddleware, httpLink, absinthSocketLink)

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    absinthSocketLink,
    httpLinkWithMiddleware
)

export default new ApolloClient({
    link,
    cache: new InMemoryCache()
})
