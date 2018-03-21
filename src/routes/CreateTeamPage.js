import React, { Component } from 'react'
import { Container, Header, Button, Message, Form } from 'semantic-ui-react'
// import { withRouter } from 'react-router-dom'
import createTeamMutation from '../graphql/mutations/createTeamMutation'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

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
        const { teamName } = this.state
        await this.props
            .mutate({
                variables: {
                    input: {
                        name: teamName
                    }
                }
            })
            .then((res) => {
                console.log(res)
                this.props.history.push(`/dashboard/${res.data.createTeam.id}`)
            })
            .catch((err) => {
                console.log(err)
                // const { message } = err.graphQLErrors[0]
                // this.setState({
                //     emailError: message,
                //     passwordError: message
                // })
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
                    <Button type="button" onClick={this.onSumbit} size="big">
                        Add Team
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default graphql(createTeamMutation)(CreateTeamPage)
