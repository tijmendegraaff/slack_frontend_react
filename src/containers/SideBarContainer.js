import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import findIndex from 'lodash/findIndex'
import camelCase from 'lodash/camelCase'
import { Teams, Channels, AddChannelModal, AddUsersToTeamModal } from '../components'
import myTeamsQuery from '../graphql/queries/myTeamsQuery'
import createChannelMutation from '../graphql/mutations/createChannelMutation'
import addUserToTeamMutation from '../graphql/mutations/addUserToTeamMuation'

class SideBarContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openAddChannelModal: false,
            openAddUsersToTeamModal: false,
            isSubmitting: false,
            channelName: '',
            channelNameError: '',
            addUserEmail: '',
            addUserEmailError: '',
            isPublic: true
        }
        this.onChange = this.onChange.bind(this)
        this.addTeam = this.addTeam.bind(this)
        this.toggleAdChannelModal = this.toggleAdChannelModal.bind(this)
        this.toggleAddUsersToTeamModal = this.toggleAddUsersToTeamModal.bind(this)
        this.handleChannelSubmit = this.handleChannelSubmit.bind(this)
        this.handleAddUsersToTeamSubmit = this.handleAddUsersToTeamSubmit.bind(this)
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    toggleAdChannelModal(e) {
        e.preventDefault()
        this.setState(state => ({
            openAddChannelModal: !state.openAddChannelModal
        }))
        this.setState({ channelName: '' })
    }

    toggleAddUsersToTeamModal(e) {
        e.preventDefault()
        this.setState(state => ({
            openAddUsersToTeamModal: !state.openAddUsersToTeamModal
        }))
        this.setState({ addUserEmail: '' })
    }

    async handleAddUsersToTeamSubmit() {
        this.setState({ isSubmitting: true })
        const teamId = this.props.currentTeam.id
        const email = this.state.addUserEmail
        await this.props
            .addUserToTeamMutation({
                variables: {
                    input: {
                        email,
                        teamId
                    }
                }
            })
            .then(() => {
                this.setState({
                    isSubmitting: false,
                    openAddUsersToTeamModal: false,
                    addUserEmail: ''
                })
            })
            .catch((err) => {
                console.log(err)
                const errors = {}
                err.graphQLErrors.forEach(({ key, message }) => {
                    errors[`${camelCase(key)}Error`] = message[0]
                })
                console.log(err.graphQLErrors)
                this.setState({ isSubmitting: false })
            })
    }

    async handleChannelSubmit() {
        this.setState({ isSubmitting: true })
        const { channelName, isPublic } = this.state
        const { currentTeam, history } = this.props
        await this.props
            .createChannelMutation({
                variables: {
                    input: {
                        name: channelName,
                        isPublic,
                        teamId: currentTeam.id
                    }
                },
                update: (proxy, { data: { createChannel } }) => {
                    const data = proxy.readQuery({ query: myTeamsQuery })
                    const currentTeamIndex = findIndex(data.myTeams, ['id', currentTeam.id])
                    data.myTeams[currentTeamIndex].channels.push(createChannel)
                    proxy.writeQuery({ query: myTeamsQuery, data })
                }
            })
            .then((res) => {
                this.setState({ isSubmitting: false, openAddChannelModal: false, channelName: '' })
                history.push(`/dashboard/${currentTeam.id}/${res.data.createChannel.id}`)
            })
            .catch((err) => {
                console.log(err)
                this.setState({ isSubmitting: false })
            })
    }

    addTeam() {
        this.props.history.push('/create-team')
    }

    render() {
        // eslint-disable-next-line
        const { myTeams, currentTeam } = this.props
        return [
            <Teams
                key="team-sidebar-component"
                teams={myTeams.map(team => ({
                    id: team.id,
                    name: team.name
                }))}
                addTeam={this.addTeam}
            />,
            <Channels
                teamId={currentTeam.id}
                key="channel-sidebar-component"
                teamName={currentTeam.name}
                username="Username"
                channels={currentTeam.channels}
                users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Tijmen' }]}
                toggleAdChannelModal={this.toggleAdChannelModal}
                toggleAddUsersToTeamModal={this.toggleAddUsersToTeamModal}
            />,
            <AddChannelModal
                open={this.state.openAddChannelModal}
                toggleAdChannelModal={this.toggleAdChannelModal}
                channelName={this.state.channelName}
                channelNameError={this.state.channelNameError}
                onChange={this.onChange}
                handleChannelSubmit={this.handleChannelSubmit}
                isSubmitting={this.state.isSubmitting}
                key="add-channel-modal"
            />,
            <AddUsersToTeamModal
                teamId={currentTeam.id}
                open={this.state.openAddUsersToTeamModal}
                toggleAddUsersToTeamModal={this.toggleAddUsersToTeamModal}
                addUserEmail={this.state.addUserEmail}
                addUserEmailError={this.state.addUserEmailError}
                onChange={this.onChange}
                handleAddUsersToTeamSubmit={this.handleAddUsersToTeamSubmit}
                isSubmitting={this.state.isSubmitting}
                key="add-users-to-channel-modal"
            />
        ]
    }
}

SideBarContainer.propTypes = {
    createChannelMutation: PropTypes.func.isRequired,
    currentTeam: PropTypes.object.isRequired,
    addUserToTeamMutation: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default compose(
    graphql(createChannelMutation, { name: 'createChannelMutation' }),
    graphql(addUserToTeamMutation, { name: 'addUserToTeamMutation' })
)(SideBarContainer)
