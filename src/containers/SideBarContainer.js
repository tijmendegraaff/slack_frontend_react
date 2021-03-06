import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import findIndex from 'lodash/findIndex'
import camelCase from 'lodash/camelCase'
import {
    Teams,
    Channels,
    AddChannelModal,
    AddUsersToTeamModal,
    DirectMessageModal
} from '../components'
import myTeamsQuery from '../graphql/queries/myTeamsQuery'
import createChannelMutation from '../graphql/mutations/createChannelMutation'
import addUserToTeamMutation from '../graphql/mutations/addUserToTeamMuation'
import createDirectMessageChannelMutation from '../graphql/mutations/createDirectMessageChannelMutation'

class SideBarContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openAddChannelModal: false,
            openAddUsersToTeamModal: false,
            openAddUsersToDirectChannelModal: false,
            isSubmitting: false,
            directChannelMembers: [],
            channelMembers: [],
            channelName: '',
            channelNameError: '',
            isPublic: true,
            addUserEmail: '',
            addUserToTeamError: ''
        }
        this.onChange = this.onChange.bind(this)
        this.addTeam = this.addTeam.bind(this)
        this.toggleAdChannelModal = this.toggleAdChannelModal.bind(this)
        this.toggleAddUsersToTeamModal = this.toggleAddUsersToTeamModal.bind(this)
        this.toggleDirectMessageModal = this.toggleDirectMessageModal.bind(this)
        this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this)
        this.handleAddDirectMessageMembers = this.handleAddDirectMessageMembers.bind(this)
        this.handleChannelSubmit = this.handleChannelSubmit.bind(this)
        this.handleAddUsersToTeamSubmit = this.handleAddUsersToTeamSubmit.bind(this)
        this.handleAddChannelMembers = this.handleAddChannelMembers.bind(this)
        this.handleDirectMessageSubmit = this.handleDirectMessageSubmit.bind(this)
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
        this.setState({ channelName: '', isPublic: true, channelMembers: [] })
    }

    toggleAddUsersToTeamModal(e) {
        e.preventDefault()
        this.setState(state => ({
            openAddUsersToTeamModal: !state.openAddUsersToTeamModal
        }))
        this.setState({ addUserEmail: '' })
    }

    toggleDirectMessageModal(e) {
        e.preventDefault()
        this.setState(state => ({
            openAddUsersToDirectChannelModal: !state.openAddUsersToDirectChannelModal
        }))
        this.setState({ directChannelMembers: [] })
    }

    async handleAddDirectMessageMembers(e, { value }) {
        await this.setState({ directChannelMembers: value })
        console.log(this.state.directChannelMembers)
    }

    async handleToggleCheckbox(e, { checked }) {
        await this.setState({ isPublic: checked })
    }

    async handleAddChannelMembers(e, { value }) {
        await this.setState({ channelMembers: value })
        console.log(this.state.channelMembers)
    }

    async handleDirectMessageSubmit() {
        this.setState({ isSubmitting: true })
        const { currentTeam, history } = this.props
        const { directChannelMembers } = this.state

        await this.props
            .createDirectMessageChannelMutation({
                variables: {
                    input: {
                        teamId: currentTeam.id,
                        members: directChannelMembers
                    }
                },
                update: (proxy, { data: { createDirectMessageChannel } }) => {
                    const data = proxy.readQuery({ query: myTeamsQuery })
                    const currentTeamIndex = findIndex(data.myTeams, ['id', currentTeam.id])
                    data.myTeams[currentTeamIndex].privateChannels.push(createDirectMessageChannel)
                    proxy.writeQuery({ query: myTeamsQuery, data })
                }
            })
            .then((res) => {
                console.log(res)
                this.setState({
                    isSubmitting: false,
                    openAddUsersToDirectChannelModal: false,
                    directChannelMembers: []
                })
                history.push(`/dashboard/${currentTeam.id}/${res.data.createDirectMessageChannel.id}`)
            })
            .catch((err) => {
                console.log(err)
                const errors = {}
                err.graphQLErrors.forEach(({ key, message }) => {
                    errors[`${camelCase(key)}Error`] = message[0]
                })
                console.log(errors)
                this.setState({ isSubmitting: false })
            })
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
                const addUserToTeamError = err.graphQLErrors[0].message
                console.log(err.graphQLErrors)
                this.setState({ isSubmitting: false, addUserToTeamError })
            })
    }

    async handleChannelSubmit() {
        this.setState({ isSubmitting: true })
        const { channelName, isPublic, channelMembers } = this.state
        const { currentTeam, history } = this.props
        await this.props
            .createChannelMutation({
                variables: {
                    input: {
                        name: channelName,
                        isPublic,
                        teamId: currentTeam.id,
                        members: channelMembers
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
                console.log(res)
                this.setState({
                    isSubmitting: false,
                    openAddChannelModal: false,
                    channelName: '',
                    isPublic: true,
                    channelMembers: []
                })
                history.push(`/dashboard/${currentTeam.id}/${res.data.createChannel.id}`)
            })
            .catch((err) => {
                // eslint-disable-next-line
                console.log(err)
                this.setState({ isSubmitting: false })
            })
    }

    addTeam() {
        this.props.history.push('/create-team')
    }

    render() {
        // eslint-disable-next-line
        const { myTeams, currentTeam, currentUser } = this.props
        if (!myTeams) {
            return null
        }
        return [
            <Teams
                key="team-sidebar-component"
                teams={myTeams.map(team => ({
                    id: team.id,
                    name: team.name,
                    channels: team.channels
                }))}
                addTeam={this.addTeam}
            />,
            <Channels
                teamId={currentTeam.id}
                key="channel-sidebar-component"
                teamName={currentTeam.name}
                username={currentUser.userName}
                channels={currentTeam.channels}
                directMessageChannels={currentTeam.privateChannels}
                users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Tijmen' }]}
                toggleAdChannelModal={this.toggleAdChannelModal}
                toggleAddUsersToTeamModal={this.toggleAddUsersToTeamModal}
                toggleDirectMessageModal={this.toggleDirectMessageModal}
                currentUser={currentUser}
                owner={currentTeam.owner.id}
            />,
            <AddChannelModal
                openAddChannelModal={this.state.openAddChannelModal}
                toggleAdChannelModal={this.toggleAdChannelModal}
                channelName={this.state.channelName}
                isPublic={this.state.isPublic}
                channelNameError={this.state.channelNameError}
                onChange={this.onChange}
                handleToggleCheckbox={this.handleToggleCheckbox}
                handleChannelSubmit={this.handleChannelSubmit}
                handleAddChannelMembers={this.handleAddChannelMembers}
                members={this.props.currentTeam.members}
                channelMembers={this.state.channelMembers}
                currentUserId={currentUser.id}
                isSubmitting={this.state.isSubmitting}
                placeholder="Add your members!"
                key="add-channel-modal"
            />,
            <AddUsersToTeamModal
                teamId={currentTeam.id}
                openAddUsersToTeamModal={this.state.openAddUsersToTeamModal}
                toggleAddUsersToTeamModal={this.toggleAddUsersToTeamModal}
                addUserEmail={this.state.addUserEmail}
                addUserToTeamError={this.state.addUserToTeamError}
                onChange={this.onChange}
                handleAddUsersToTeamSubmit={this.handleAddUsersToTeamSubmit}
                isSubmitting={this.state.isSubmitting}
                key="add-users-to-channel-modal"
            />,
            <DirectMessageModal
                currentUserId={currentUser.id}
                teamId={currentTeam.id}
                open={this.state.openAddUsersToDirectChannelModal}
                toggleDirectMessageModal={this.toggleDirectMessageModal}
                directChannelMembers={this.state.directChannelMembers}
                handleAddDirectMessageMembers={this.handleAddDirectMessageMembers}
                isSubmitting={this.state.isSubmitting}
                key="add-users-to-direct-message-modal"
                members={this.props.currentTeam.members}
                handleDirectMessageSubmit={this.handleDirectMessageSubmit}
            />
        ]
    }
}

SideBarContainer.propTypes = {
    currentTeam: PropTypes.object.isRequired,
    createChannelMutation: PropTypes.func.isRequired,
    createDirectMessageChannelMutation: PropTypes.func.isRequired,
    addUserToTeamMutation: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default compose(
    graphql(createDirectMessageChannelMutation, { name: 'createDirectMessageChannelMutation' }),
    graphql(createChannelMutation, { name: 'createChannelMutation' }),
    graphql(addUserToTeamMutation, { name: 'addUserToTeamMutation' })
)(SideBarContainer)
