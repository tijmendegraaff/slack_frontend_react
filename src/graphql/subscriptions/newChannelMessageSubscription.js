import gql from 'graphql-tag'

export default gql`
    subscription newChannelMessage($channelId: ID!) {
        newChannelMessage(channelId: $channelId) {
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
