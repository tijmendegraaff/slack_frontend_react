import gql from 'graphql-tag'

export default gql`
    mutation createDirectMessageChannel($input: DirectMessageChannelInputType!) {
        createDirectMessageChannel(input: $input) {
            id
            name
            isPublic
            isDirectMessageChannel
            members {
                id
                userName
            }
        }
    }
`
