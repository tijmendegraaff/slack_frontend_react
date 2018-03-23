import gql from 'graphql-tag'

export default gql`
    mutation createDirectMessage($input: DirectMessageInputType!) {
        createDirectMessage(input: $input) {
            id
            content
            insertedAt
            sender {
                id
                userName
            }
        }
    }
`
