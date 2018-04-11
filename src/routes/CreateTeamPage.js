import React, { Component } from 'react'
import { Container, Header, Button, Message, Form, Grid, TextArea } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import createTeamMutation from '../graphql/mutations/createTeamMutation'
import myTeamsQuery from '../graphql/queries/myTeamsQuery'

class CreateTeamPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamName: '',
            createTeamError: '',
            teamDesciption: '',
            teamDesciptionError: '',
            teamAvatar: null
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
        const { teamName, teamDesciption } = this.state
        await this.props
            .mutate({
                variables: {
                    input: {
                        name: teamName,
                        discription: teamDesciption
                    }
                }
            })
            .then((res) => {
                this.props.history.push(`/dashboard/${res.data.createTeam.id}/${res.data.createTeam.channels[0].id}`)
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
        console.log(this.state)
        const {
            teamName, createTeamError, teamDesciption, teamDesciptionError
        } = this.state
        return (
            <Container text>
                <Form>
                    <br />
                    <Header as="h2">Create a Team</Header> <br />
                    <Grid divided="vertically">
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Field error={!!createTeamError}>
                                    <label>Team Name</label>
                                    <br />
                                    <input
                                        placeholder="Teamname"
                                        name="teamName"
                                        onChange={this.onChange}
                                        value={teamName}
                                    />
                                </Form.Field>
                                {createTeamError && (
                                    <Message size="tiny">{createTeamError}</Message>
                                )}
                                <Form.Field>
                                    <label>Team Description</label>
                                </Form.Field>
                                <TextArea
                                    placeholder="Tell us more"
                                    style={{ minHeight: 100 }}
                                    value={teamDesciption}
                                    name="teamDesciption"
                                    onChange={this.onChange}
                                />
                                {teamDesciptionError && (
                                    <Message size="tiny">{teamDesciptionError}</Message>
                                )}
                            </Grid.Column>
                            <Grid.Column>
                                <div className="dropzone">
                                    <Dropzone onDrop={console.log('dropzone')}>
                                        <p>
                                            Try dropping some files here, or click to select files
                                            to upload.
                                        </p>
                                    </Dropzone>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button type="button" onClick={this.onSumbit} size="big">
                        Add Team
                    </Button>
                    <Button
                        type="button"
                        onClick={() => this.props.history.push('/dashboard')}
                        size="big"
                        basic
                    >
                        Cancel
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
