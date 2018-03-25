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
            openDirectMessageModal: false,
            isSubmitting: false,
            channelName: '',
            channelNameError: '',
            channelMembers: [],
            addUserEmail: '',
            addUserEmailError: '',
            directMessageUsers: [],
            isPublic: true
        }
        this.onChange = this.onChange.bind(this)
        this.addTeam = this.addTeam.bind(this)
        this.toggleAdChannelModal = this.toggleAdChannelModal.bind(this)
        this.toggleAddUsersToTeamModal = this.toggleAddUsersToTeamModal.bind(this)
        this.handleChannelSubmit = this.handleChannelSubmit.bind(this)
        this.handleAddUsersToTeamSubmit = this.handleAddUsersToTeamSubmit.bind(this)
        this.toggleDirectMessageModal = this.toggleDirectMessageModal.bind(this)
        this.handleAddDirectMessage = this.handleAddDirectMessage.bind(this)
        this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this)
        this.handleAddChannelMembers = this.handleAddChannelMembers.bind(this)
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
            openDirectMessageModal: !state.openDirectMessageModal
        }))
        // this.setState({ addUserEmail: '' })
        console.log('toggleDirectMessageModal clicked')
    }

    handleAddDirectMessage() {
        console.log('user added to directly message')
    }

    async handleToggleCheckbox(e, { checked }) {
        // console.log('checkbox toggled ', this.state.isPublic)
        // console.log(checked)
        await this.setState({ isPublic: checked })
        console.log('is public is set to: ', this.state.isPublic)
    }

    async handleAddChannelMembers(e, { value }) {
        console.log(value)
        await this.setState({ channelMembers: value })
        console.log(this.state.channelMembers)
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
                const errors = {}
                err.graphQLErrors.forEach(({ key, message }) => {
                    errors[`${camelCase(key)}Error`] = message[0]
                })
                this.setState({ isSubmitting: false })
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
                username={currentUser.userName}
                channels={currentTeam.channels}
                users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Tijmen' }]}
                toggleAdChannelModal={this.toggleAdChannelModal}
                toggleAddUsersToTeamModal={this.toggleAddUsersToTeamModal}
                toggleDirectMessageModal={this.toggleDirectMessageModal}
                currentUser={currentUser}
                owner={currentTeam.owner.id}
            />,
            <AddChannelModal
                open={this.state.openAddChannelModal}
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
                open={this.state.openAddUsersToTeamModal}
                toggleAddUsersToTeamModal={this.toggleAddUsersToTeamModal}
                addUserEmail={this.state.addUserEmail}
                addUserEmailError={this.state.addUserEmailError}
                onChange={this.onChange}
                handleAddUsersToTeamSubmit={this.handleAddUsersToTeamSubmit}
                isSubmitting={this.state.isSubmitting}
                key="add-users-to-channel-modal"
            />,
            <DirectMessageModal
                teamId={currentTeam.id}
                open={this.state.openDirectMessageModal}
                toggleDirectMessageModal={this.toggleDirectMessageModal}
                directMessageUsers={this.state.directMessageUsers}
                onChange={this.onChange}
                handleAddDirectMessage={this.handleAddDirectMessage}
                isSubmitting={this.state.isSubmitting}
                key="add-users-to-direct-message-modal"
                members={this.props.currentTeam.members}
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
