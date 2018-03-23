import gql from 'graphql-tag'

export default gql`
    query directMessages($input: DirectMessageQueryType!) {
        directMessages(input: $input) {
            id
            insertedAt
            content
            sender {
                userName
            }
        }
    }
`
