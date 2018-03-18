import React from 'react'
import PropTypes from 'prop-types'

const Header = props => <div className="header">{props.children}</div>

Header.propTypes = {
    children: PropTypes.any.isRequired
}

export default Header
