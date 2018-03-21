import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import findIndex from 'lodash/findIndex'
import { Teams, Channels, AddChannelModal, AddUsersToTeamModal } from '../components'
import myTeamsQuery from '../graphql/queries/myTeamsQuery'
import createChannelMutation from '../graphql/mutations/createChannelMutation'

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
        this.addTeam = this.addTeam.bind(this)
        this.onOpenAddChannelModal = this.onOpenAddChannelModal.bind(this)
        this.onCloseAddChannelModal = this.onCloseAddChannelModal.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleChannelSubmit = this.handleChannelSubmit.bind(this)
        this.onCloseAddUsersToTeamModal = this.onCloseAddUsersToTeamModal.bind(this)
        this.onOpenAddUsersToTeamModal = this.onOpenAddUsersToTeamModal.bind(this)
        this.handleAddUsersToTeamSubmit = this.handleAddUsersToTeamSubmit.bind(this)
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onCloseAddChannelModal() {
        this.setState({ openAddChannelModal: false, channelName: '' })
    }
    onOpenAddChannelModal() {
        this.setState({ openAddChannelModal: true })
    }

    onCloseAddUsersToTeamModal() {
        this.setState({ openAddUsersToTeamModal: false })
    }
    onOpenAddUsersToTeamModal() {
        console.log('Open add user modal')
        this.setState({ openAddUsersToTeamModal: true })
    }

    handleAddUsersToTeamSubmit() {
        console.log(`adding teammember: ${this.state.addUserEmail}`)
    }

    async handleChannelSubmit() {
        this.setState({ isSubmitting: true })
        const { channelName, isPublic } = this.state
        const { currentTeam, history } = this.props
        await this.props
            .mutate({
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
        console.log('add a team')
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
                onAddChannelClick={this.onOpenAddChannelModal}
                onAddUsersToTeamClick={this.onOpenAddUsersToTeamModal}
            />,
            <AddChannelModal
                open={this.state.openAddChannelModal}
                onCloseAddChannelModal={this.onCloseAddChannelModal}
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
                onCloseAddUsersToTeamModal={this.onCloseAddUsersToTeamModal}
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
    mutate: PropTypes.func.isRequired
}

export default graphql(createChannelMutation)(SideBarContainer)
