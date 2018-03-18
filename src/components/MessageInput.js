import React from 'react'
import PropTypes from 'prop-types'

const MessageInput = props => <div className="input">{props.children}</div>

MessageInput.propTypes = {
    children: PropTypes.any.isRequired
}

export default MessageInput
