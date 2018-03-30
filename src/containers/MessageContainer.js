import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { SendMessageWrapper, MessagesWrapper } from '../components'
import createMessageMutation from '../graphql/mutations/createMessageMutation'
import messagesQuery from '../graphql/queries/messagesQuery'
import newChannelMessageSubscription from '../graphql/subscriptions/newChannelMessageSubscription'

const ENTER_KEY = 13

class MessageContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            messageError: '',
            isSubmitting: false,
            hasMoreItems: true
        }
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
        this.subscribeToChannel = this.subscribeToChannel.bind(this)
        this.fetchMoreMessage = this.fetchMoreMessage.bind(this)
    }

    componentDidMount() {
        this.unsubscribeToChannel = this.subscribeToChannel(this.props.channelId)
    }

    componentWillReceiveProps({ channelId }) {
        if (this.props.channelId !== channelId) {
            if (this.unsubscribeToChannel) {
                this.unsubscribeToChannel()
            }
            this.unsubscribeToChannel = this.subscribeToChannel(channelId)
        }
    }

    componentWillUnmount() {
        if (this.unsubscribeToChannel) {
            this.unsubscribeToChannel()
        }
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

    subscribeToChannel(channelId) {
        return this.props.data.subscribeToMore({
            document: newChannelMessageSubscription,
            variables: {
                channelId
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) {
                    return prev
                }

                return {
                    ...prev,
                    messages: [...prev.messages, subscriptionData.data.newChannelMessage]
                }
            }
        })
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
                .then(() => {
                    this.setState({ message: '', isSubmitting: false })
                })
                .catch((err) => {
                    // TODO error handeling
                    console.log(err)
                })
        }
    }

    fetchMoreMessage() {
        const { data: { fetchMore, messages }, channelId } = this.props
        fetchMore({
            variables: {
                input: {
                    channelId,
                    cursor: messages[messages.length - 1].insertedAt
                }
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                    return previousResult
                }

                if (fetchMoreResult.messages.length < 40) {
                    this.setState({ hasMoreItems: false })
                }

                return {
                    ...previousResult,
                    messages: [...previousResult.messages, ...fetchMoreResult.messages]
                }
            }
        })
    }

    render() {
        const { data: { messages }, chatInputPlaceholder } = this.props
        const {
            message, messageError, isSubmitting, hasMoreItems
        } = this.state
        if (!messages) {
            return null
        }
        return [
            <MessagesWrapper
                key="message-wrapper"
                messages={messages}
                hasMoreItems={hasMoreItems}
                fetchMoreMessage={this.fetchMoreMessage}
                loading={this.props.data.loading}
            />,
            <SendMessageWrapper
                key="send-message-input"
                message={message}
                messageError={messageError}
                isSubmitting={isSubmitting}
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                name="message"
                chatInputPlaceholder={chatInputPlaceholder}
            />
        ]
    }
}

MessageContainer.propTypes = {
    mutate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    channelId: PropTypes.string.isRequired,
    chatInputPlaceholder: PropTypes.string.isRequired
}

export default compose(
    graphql(createMessageMutation),
    graphql(messagesQuery, {
        options: ({ channelId }) => ({
            variables: { input: { channelId } },
            notifyOnNetworkStatusChange: true
        })
    })
)(MessageContainer)
