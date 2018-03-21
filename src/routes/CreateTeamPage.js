import React, { Component } from 'react'
import { Container, Header, Button, Message, Form } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import createTeamMutation from '../graphql/mutations/createTeamMutation'
// import myTeamsQuery from '../graphql/queries/myTeamsQuery'

class CreateTeamPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamName: '',
            createTeamError: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSumbit = this.onSumbit.bind(this)
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    async onSumbit() {
        this.setState({ createTeamError: '' })
        const { teamName } = this.state
        await this.props
            .mutate({
                variables: {
                    input: {
                        name: teamName
                    }
                }
                // refetchQueries: [`currentUser`]
                // update: (proxy, { data: { createTeam } }) => {
                //     const data = proxy.readQuery({ query: myTeamsQuery })
                //     console.log(data)
                // data.myTeams.push(createTeam)
                // proxy.writeQuery({ query: myTeamsQuery, data })
                // }
            })
            .then((res) => {
                // await
                // TODO first team you make causes redirect to mallfunction
                console.log(res)
                this.props.history.push(`/dashboard/${res.data.createTeam.id}`)
            })
            .catch((err) => {
                console.log(err.graphQLErrors[0].message[0])
                const message = err.graphQLErrors[0].message[0]
                this.setState({
                    createTeamError: message
                })
            })
    }

    render() {
        const { teamName, createTeamError } = this.state
        return (
            <Container text>
                <Form>
                    <br />
                    <Header as="h2">Create a Team</Header> <br />
                    <Form.Field error={!!createTeamError}>
                        <label>Team Name</label>
                        <input
                            placeholder="teamname"
                            name="teamName"
                            onChange={this.onChange}
                            value={teamName}
                        />
                    </Form.Field>
                    {createTeamError && <Message size="tiny">{createTeamError}</Message>}
                    <Button type="button" onClick={this.onSumbit} size="big">
                        Add Team
                    </Button>
                </Form>
            </Container>
        )
    }
}

CreateTeamPage.propTypes = {
    history: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired
}

export default graphql(createTeamMutation)(CreateTeamPage)
