import gql from 'graphql-tag'

export default gql`
    mutation createTeam($input: TeamInputType!) {
        createTeam(input: $input) {
            id
            name
        }
    }
`
