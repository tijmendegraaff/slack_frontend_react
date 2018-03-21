import gql from 'graphql-tag'

export default gql`
    mutation createMessage($input: MessageInputType!) {
        createMessage(input: $input) {
            id
            content
        }
    }
`
