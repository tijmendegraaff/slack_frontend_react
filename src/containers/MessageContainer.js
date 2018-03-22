import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { SendMessageWrapper, MessagesWrapper } from '../components'
import createMessageMutation from '../graphql/mutations/createMessageMutation'
import messagesQuery from '../graphql/queries/messagesQuery'

const ENTER_KEY = 13

class MessageContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            messageError: '',
            isSubmitting: false
        }
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onKeyDown(e) {
        if (e.keyCode === ENTER_KEY && !this.state.isSubmitting) {
            this.handleMessageSubmit(e)
        }
    }

    async handleMessageSubmit(e) {
        e.preventDefault()
        this.setState({ isSubmitting: true })
        const { message } = this.state
        const { channelId } = this.props
        if (message === '' || message.trim() === '') {
            this.setState({ isSubmitting: false, message: '' })
        } else {
            await this.props
                .mutate({
                    variables: {
                        input: {
                            content: message,
                            channelId
                        }
                    }
                })
                .then((res) => {
                    console.log(res)
                    this.setState({ message: '', isSubmitting: false })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        const { channelName, data: { messages } } = this.props
        const { message, messageError, isSubmitting } = this.state
        console.log(this.props)
        if (!messages) {
            return null
        }
        return [
            <MessagesWrapper key="message-wrapper" messages={messages} />,
            <SendMessageWrapper
                key="send-message-input"
                channelName={channelName}
                message={message}
                messageError={messageError}
                isSubmitting={isSubmitting}
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
            />
        ]
    }
}

MessageContainer.propTypes = {
    channelName: PropTypes.string.isRequired,
    mutate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

export default compose(
    graphql(createMessageMutation),
    graphql(messagesQuery, { options: ({ channelId }) => ({ variables: { channelId } }) })
)(MessageContainer)
