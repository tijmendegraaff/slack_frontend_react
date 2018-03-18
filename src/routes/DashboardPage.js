import React, { Component } from 'react'
import { AppWrapper, Channels, Header, Teams, MessageInput } from '../components'
import { MessageContainer } from '../containers'

class DashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <AppWrapper>
                <Teams>Teams</Teams>
                <Channels>Channels</Channels>
                <Header>Header</Header>
                <MessageContainer>
                    <ul className="message-list">
                        <li>Hey</li>
                        <li>What is going on?</li>
                    </ul>
                </MessageContainer>
                <MessageInput>
                    <input type="text" placeholder="CSS Grid Layout Module" />
                </MessageInput>
            </AppWrapper>
        )
    }
}

export default DashboardPage
