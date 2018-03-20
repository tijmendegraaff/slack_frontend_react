import React, { Component } from 'react'
import { AppWrapper, HeaderWrapper, SendMessage } from '../components'
import { MessageContainer, SideBarContainer } from '../containers'

class DashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <AppWrapper>
                <SideBarContainer currentTeamId="1" />
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
