import gql from 'graphql-tag'

export default gql`
    mutation createSession($input: SessionInputType!) {
        createSession(input: $input) {
            token
            user {
                id
                lastName
                teams {
                    id
                    name
                    channels {
                        id
                        name
                    }
                }
            }
        }
    }
`
