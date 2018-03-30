import gql from 'graphql-tag'

export default gql`
    query myTeams {
        myTeams {
            id
            name
            channels {
                id
                name
                isPublic
            }
            privateChannels {
                id
                name
                isDirectMessageChannel
                members {
                    id
                    userName
                }
            }
            owner {
                id
            }
            members {
                id
                userName
                email
            }
        }
    }
`
