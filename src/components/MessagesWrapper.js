import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Comment } from 'semantic-ui-react'

class MessagesWrapper extends Component {
    constructor(props) {
        super(props)
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentWillReceiveProps({ messages }) {
        if (
            this.scroller &&
            this.scroller.scrollTop < 20 &&
            this.props.messages &&
            messages &&
            this.props.messages.length !== messages.length
        ) {
            // 35 items
            const heightBeforeRender = this.scroller.scrollHeight
            // wait for 70 items to render
            setTimeout(() => {
                this.scroller.scrollTop = this.scroller.scrollHeight - heightBeforeRender
            }, 120)
        }
    }
    handleScroll() {
        if (
            this.scroller &&
            this.scroller.scrollTop < 20 &&
            this.props.messages.length >= 40 &&
            this.props.hasMoreItems &&
            !this.props.loading
        ) {
            this.props.fetchMoreMessage()
        }
    }
    render() {
        const { messages } = this.props
        if (messages.length === 0) {
            return null
        }
        return (
            <div
                className="messages"
                onScroll={this.handleScroll}
                ref={(scroller) => {
                    this.scroller = scroller
                }}
            >
                <div className="message-list">
                    <Comment.Group>
                        {messages.map(message => (
                            <Comment key={`message-${message.id}`}>
                                <Comment.Avatar src="https://api.adorable.io/avatars/285/abott@adorable.png" />
                                <Comment.Content>
                                    <Comment.Author as="a">
                                        {message.user
                                            ? message.user.userName
                                            : message.sender.userName}
                                    </Comment.Author>
                                    <Comment.Metadata>
                                        <div>{message.insertedAt}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{message.content}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        ))}
                    </Comment.Group>
                </div>
            </div>
        )
    }
}

MessagesWrapper.propTypes = {
    messages: PropTypes.array.isRequired,
    hasMoreItems: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchMoreMessage: PropTypes.func.isRequired
}

export default MessagesWrapper
