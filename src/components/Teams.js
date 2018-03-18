import React from 'react'
import PropTypes from 'prop-types'

const Teams = props => <div className="teams">{props.children}</div>

Teams.propTypes = {
    children: PropTypes.any.isRequired
}

export default Teams
