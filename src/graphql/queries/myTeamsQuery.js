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
