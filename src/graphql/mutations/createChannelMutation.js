import gql from 'graphql-tag'

export default gql`
    mutation createChannel($input: ChannelInputType!) {
        createChannel(input: $input) {
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
