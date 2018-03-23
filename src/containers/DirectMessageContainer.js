import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { SendMessageWrapper, MessagesWrapper } from '../components'
import createDirectMessageMutation from '../graphql/mutations/createDirectMessageMutation'
import directMessagesQuery from '../graphql/queries/directMessageQuery'
// import newDirectMessageSubscription from '../graphql/subscriptions/newDirectMessageSubscription'

const ENTER_KEY = 13

class DirectMessageContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            directMessage: '',
            directMessageError: '',
            isSubmitting: false
        }
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleDirectMessageSubmit = this.handleDirectMessageSubmit.bind(this)
    }

    // componentWillReceiveProps({ channelId }) {
    //     if (this.props.channelId !== channelId) {
    //         if (this.unsubscribe) {
    //             this.unsubscribe()
    //         }
    //         this.unsubscribe = this.props.data.subscribeToMore({
    //             document: newChannelMessageSubscription,
    //             variables: {
    //                 channelId
    //             },
    //             updateQuery: (prev, { subscriptionData }) => {
    //                 if (!subscriptionData) {
    //                     return prev
    //                 }

    //                 return {
    //                     ...prev,
    //                     messages: [...prev.messages, subscriptionData.data.newChannelMessage]
    //                 }
    //             }
    //         })
    //         console.log(this.unsubscribe)
    //     }
    // }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onKeyDown(e) {
        if (e.keyCode === ENTER_KEY && !this.state.isSubmitting) {
            this.handleDirectMessageSubmit(e)
        }
    }

    async handleDirectMessageSubmit(e) {
        e.preventDefault()
        this.setState({ isSubmitting: true })
        const { directMessage } = this.state
        const { teamId, userId } = this.props
        if (directMessage === '' || directMessage.trim() === '') {
            this.setState({ isSubmitting: false, directMessage: '' })
        } else {
            await this.props
                .mutate({
                    variables: {
                        input: {
                            content: directMessage,
                            teamId,
                            receiverId: userId
                        }
                    }
                })
                .then((res) => {
                    console.log(res)
                    this.setState({ directMessage: '', isSubmitting: false })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        const { channelName, data: { directMessages } } = this.props
        const { directMessage, directMessageError, isSubmitting } = this.state
        if (!directMessages) {
            return null
        }
        return [
            <MessagesWrapper key="message-wrapper" messages={directMessages} />,
            <SendMessageWrapper
                key="send-message-input"
                channelName={channelName}
                message={directMessage}
                messageError={directMessageError}
                isSubmitting={isSubmitting}
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                name="directMessage"
            />
        ]
    }
}

DirectMessageContainer.propTypes = {
    channelName: PropTypes.string.isRequired,
    mutate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    teamId: PropTypes.string.isRequired
}

export default compose(
    graphql(createDirectMessageMutation),
    graphql(directMessagesQuery, {
        options: ({ teamId, userId }) => ({ variables: { input: { teamId, receiverId: userId } } })
    })
)(DirectMessageContainer)
