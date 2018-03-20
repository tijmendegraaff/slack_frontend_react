import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MessageContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return <div className="messages">{this.props.children}</div>
    }
}

MessageContainer.propTypes = {
    children: PropTypes.any.isRequired
}

export default MessageContainer
