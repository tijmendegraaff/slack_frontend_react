import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { Teams, Channels, AddChannelModal } from '../components'
import myTeamsQuery from '../graphql/queries/myTeamsQuery'

class SideBarContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openAddChannelModal: false,
            channelName: ''
        }
        this.addTeam = this.addTeam.bind(this)
        this.addChannel = this.addChannel.bind(this)
        this.onCloseAddChannelModal = this.onCloseAddChannelModal.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }

    onCloseAddChannelModal() {
        this.setState({ openAddChannelModal: false, channelName: '' })
    }
    addChannel() {
        console.log('add channel')
    }

    addTeam() {
        console.log('add a team')
    }

    render() {
        console.log(this.state.openAddChannelModal)
        // eslint-disable-next-line
        const { data: { loading, myTeams }, currentTeamId } = this.props
        if (loading) {
            return null
        }
        const currentTeam = currentTeamId
            ? myTeams.filter(t => t.id === currentTeamId)[0]
            : myTeams[0]
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
                key="channel-sidebar-component"
                teamName={currentTeam.name}
                username="Username"
                channels={currentTeam.channels}
                users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Tijmen' }]}
                onAddChannelClick={this.addChannel}
            />,
            <AddChannelModal
                open={this.state.openAddChannelModal}
                onCloseAddChannelModal={this.onCloseAddChannelModal}
                channelName={this.state.channelName}
                onChange={this.onChange}
                key="add-channel-modal"
            />
        ]
    }
}

SideBarContainer.propTypes = {
    data: PropTypes.object.isRequired
}

export default graphql(myTeamsQuery)(SideBarContainer)
