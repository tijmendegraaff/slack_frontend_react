import gql from 'graphql-tag'

export default gql`
    mutation createDirectMessageChannel($input: DirectMessageChannelInputType!) {
        createDirectMessageChannel(input: $input) {
            id
            isPublic
            isDirectMessageChannel
        }
    }
`
