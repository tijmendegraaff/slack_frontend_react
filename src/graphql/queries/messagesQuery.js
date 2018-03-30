import gql from 'graphql-tag'

export default gql`
    query messages($input: MessageQueryInputType!) {
        messages(input: $input) {
            id
            content
            insertedAt
            user {
                id
                userName
            }
        }
    }
`
