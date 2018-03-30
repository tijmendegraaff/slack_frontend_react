import gql from 'graphql-tag'

export default gql`
    mutation createUser($input: UserInputType!) {
        createUser(input: $input) {
            id
            userName
            role
        }
    }
`
