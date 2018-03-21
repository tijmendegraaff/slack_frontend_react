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
        }
    }
`
