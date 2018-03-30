import gql from 'graphql-tag'

export default gql`
    mutation addUserToTeam($input: MemberInputType!) {
        addUserToTeam(input: $input) {
            userId
            teamId
        }
    }
`
