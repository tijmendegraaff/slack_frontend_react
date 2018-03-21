import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import myTeamsQuery from '../graphql/queries/myTeamsQuery'
import { AppWrapper, HeaderWrapper, SendMessage } from '../components'
import { MessageContainer, SideBarContainer } from '../containers'

class DashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        // eslint-disable-next-line
        const {
            match: { params: { teamId, channelId } },
            history,
            data: { myTeams, loading }
        } = this.props
        if (loading) {
            return null
        }

        if (!myTeams.length) {
            return <Redirect to="/create-team" />
        }

        const currentTeam = teamId ? myTeams.filter(t => t.id === teamId)[0] : myTeams[0]

        const currentChannel = channelId
            ? currentTeam.channels.filter(c => c.id === channelId)[0]
            : currentTeam.channels[0]
        return (
            <AppWrapper>
                <SideBarContainer myTeams={myTeams} currentTeam={currentTeam} history={history} />
                {currentChannel && <HeaderWrapper channelName={currentChannel.name} />}
                {currentChannel && (
                    <MessageContainer channelId={currentChannel.id}>
                        <ul className="message-list">
                            <li>Hey</li>
                            <li>What is going on?</li>
                        </ul>
                    </MessageContainer>
                )}
                {currentChannel && <SendMessage channelName={currentChannel.name} />}
            </AppWrapper>
        )
    }
}

DashboardPage.propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
}

export default graphql(myTeamsQuery)(DashboardPage)
