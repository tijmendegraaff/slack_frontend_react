import React, { Component } from 'react'

class MessageContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return <div className="messages">{this.props.children}</div>
    }
}

export default MessageContainer
