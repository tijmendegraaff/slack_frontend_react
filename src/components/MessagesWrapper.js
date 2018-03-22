import React from 'react'
import PropTypes from 'prop-types'
import { Comment } from 'semantic-ui-react'

const MessagesWrapper = ({ messages }) => {
    if (messages.length === 0) {
        return null
    }
    return (
        <div className="messages">
            <div className="message-list">
                <Comment.Group>
                    {messages.map(message => (
                        <Comment key={`message-${message.id}`}>
                            <Comment.Avatar src="/assets/images/avatar/small/matt.jpg" />
                            <Comment.Content>
                                <Comment.Author as="a">{message.user.userName}</Comment.Author>
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

MessagesWrapper.propTypes = {
    messages: PropTypes.array.isRequired
}

export default MessagesWrapper
