import gql from 'graphql-tag'

export default gql`
    query messages($channelId: ID!) {
        messages(channelId: $channelId) {
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
