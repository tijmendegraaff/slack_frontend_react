import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import findIndex from 'lodash/findIndex'
import myTeamsQuery from '../graphql/queries/myTeamsQuery'
import currentUserQuery from '../graphql/queries/currentUserQuery'
import { AppWrapper, HeaderWrapper } from '../components'
import { DirectMessageContainer, SideBarContainer } from '../containers'

class DirectMessagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        // eslint-disable-next-line
        const {
            match: { params: { teamId, userId } },
            history,
            myTeamsQuery: { myTeams },
            currentUserQuery: { currentUser }
        } = this.props
        const myTeamsQueryLoading = this.props.myTeamsQuery.loading
        const currentUserQueryLoading = this.props.currentUserQuery.loading
        if (myTeamsQueryLoading || currentUserQueryLoading) {
            return null
        }

        // if (!myTeams.length) {
        //     return <Redirect to="/create-team" />
        // }

        const teamIndex = teamId ? findIndex(myTeams, ['id', teamId]) : 0
        const currentTeam = teamIndex === -1 ? myTeams[0] : myTeams[teamIndex]

        return (
            <AppWrapper>
                <SideBarContainer
                    myTeams={myTeams}
                    currentTeam={currentTeam}
                    history={history}
                    currentUser={currentUser}
                />
                <HeaderWrapper channelName="hey" />
                <DirectMessageContainer userId={userId} teamId={currentTeam.id} channelName="hey" />
            </AppWrapper>
        )
    }
}

DirectMessagePage.propTypes = {
    myTeamsQuery: PropTypes.object.isRequired,
    currentUserQuery: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
}

export default compose(
    graphql(myTeamsQuery, { name: 'myTeamsQuery', options: { fetchPolicy: 'network-only' } }),
    graphql(currentUserQuery, { name: 'currentUserQuery' })
)(DirectMessagePage)