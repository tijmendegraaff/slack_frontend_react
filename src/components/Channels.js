import React from 'react'
import PropTypes from 'prop-types'

const Channels = props => <div className="channels">{props.children}</div>

Channels.propTypes = {
    children: PropTypes.any.isRequired
}

export default Channels
