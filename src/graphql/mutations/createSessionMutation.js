import gql from 'graphql-tag'

export default gql`
    mutation createSession($input: SessionInputType!) {
        createSession(input: $input) {
            token
        }
    }
`
