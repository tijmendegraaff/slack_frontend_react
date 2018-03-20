import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { Teams, Channels } from '../components'
import myTeamsQuery from '../graphql/queries/myTeamsQuery'

class SideBarContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.addTeam = this.addTeam.bind(this)
    }

    addTeam() {
        console.log('add a team')
    }

    render() {
        const { data: { loading, myTeams }, currentTeamId } = this.props
        if (loading) {
            return null
        }
        const currentTeam = myTeams.filter(t => t.id === currentTeamId)[0]
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
                teamName="Teamname"
                username="Username"
                channels={currentTeam.channels}
                users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Tijmen' }]}
            />
        ]
    }
}

SideBarContainer.propTypes = {
    data: PropTypes.object.isRequired,
    currentTeamId: PropTypes.string.isRequired
}

export default graphql(myTeamsQuery)(SideBarContainer)
