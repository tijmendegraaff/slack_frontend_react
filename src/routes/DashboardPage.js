import React, { Component } from 'react'
import { AppWrapper, Channels, HeaderWrapper, Teams, SendMessage } from '../components'
import { MessageContainer } from '../containers'

class DashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.addTeam = this.addTeam.bind(this)
    }

    addTeam() {
        console.log('add a team')
    }
    render() {
        return (
            <AppWrapper>
                <Teams
                    teams={[{ id: 1, name: 'Le Wagon' }, { id: 2, name: 'Bacon' }]}
                    addTeam={this.addTeam}
                />
                <Channels
                    teamName="Teamname"
                    username="Username"
                    channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
                    users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Tijmen' }]}
                />
                <HeaderWrapper channelName="general" />
                <MessageContainer>
                    <ul className="message-list">
                        <li>Hey</li>
                        <li>What is going on?</li>
                    </ul>
                </MessageContainer>
                <SendMessage channelName="general" />
            </AppWrapper>
        )
    }
}

export default DashboardPage
