import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import findIndex from 'lodash/findIndex'
import myTeamsQuery from '../graphql/queries/myTeamsQuery'
import currentUserQuery from '../graphql/queries/currentUserQuery'
import { AppWrapper, HeaderWrapper } from '../components'
import { MessageContainer, SideBarContainer } from '../containers'

class DashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.findCurrentTeam = this.findCurrentTeam.bind(this)
        this.findCurrentChannel = this.findCurrentChannel.bind(this)
    }
    // TODO check params to see if channel in params is loaded in cache

    findCurrentTeam() {
        const { match: { params: { teamId } }, myTeamsQuery: { myTeams } } = this.props
        if (teamId) {
            return myTeams[findIndex(myTeams, ['id', teamId])]
        }
        return 0
    }

    findCurrentChannel(currentTeam) {
        const { match: { params: { channelId } } } = this.props
        if (channelId) {
            const channel = currentTeam.channels[findIndex(currentTeam.channels, ['id', channelId])]
            if (!channel) {
                const privateChannel =
                    currentTeam.privateChannels[
                        findIndex(currentTeam.privateChannels, ['id', channelId])
                    ]
                return privateChannel
            }
            return channel
        }
        return 0
    }

    render() {
        // eslint-disable-next-line
        const { history, myTeamsQuery: { myTeams }, currentUserQuery: { currentUser } } = this.props
        const myTeamsQueryLoading = this.props.myTeamsQuery.loading
        const currentUserQueryLoading = this.props.currentUserQuery.loading
        if (myTeamsQueryLoading || currentUserQueryLoading) {
            return null
        }
        if (!myTeams.length) {
            return history.push('/createTeam')
        }

        const currentTeam = this.findCurrentTeam()
        const currentChannel = this.findCurrentChannel(currentTeam)
        return (
            <AppWrapper>
                <SideBarContainer
                    myTeams={myTeams}
                    currentTeam={currentTeam}
                    history={history}
                    currentUser={currentUser}
                />
                {currentChannel && <HeaderWrapper channelName={currentChannel.name} />}
                {currentChannel && (
                    <MessageContainer
                        channelId={currentChannel.id}
                        channelName={currentChannel.name}
                    />
                )}
            </AppWrapper>
        )
    }
}

DashboardPage.propTypes = {
    myTeamsQuery: PropTypes.object.isRequired,
    currentUserQuery: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
}

export default compose(
    graphql(myTeamsQuery, { name: 'myTeamsQuery', options: { fetchPolicy: 'network-only' } }),
    graphql(currentUserQuery, { name: 'currentUserQuery' })
)(DashboardPage)
