import React from 'react'
import PropTypes from 'prop-types'

const AppWrapper = props => <div className="app-layout">{props.children}</div>

AppWrapper.propTypes = {
    children: PropTypes.any.isRequired
}

export default AppWrapper
