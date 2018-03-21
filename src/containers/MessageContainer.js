import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SendMessageWrapper, MessagesWrapper } from '../components'

class MessageContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            messageError: ''
        }
    }
    render() {
        const { channelName } = this.props
        const { message, messageError } = this.state
        return [
            <MessagesWrapper key="message-wrapper" />,
            <SendMessageWrapper
                key="send-message-input"
                channelName={channelName}
                message={message}
                messageError={messageError}
            />
        ]
    }
}

MessageContainer.propTypes = {
    channelName: PropTypes.string.isRequired
}

export default MessageContainer
