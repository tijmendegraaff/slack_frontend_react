import gql from 'graphql-tag'

export default gql`
    query myTeams {
        myTeams {
            id
            name
            avatar
            description
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
