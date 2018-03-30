import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'

const HeaderWrapper = ({ channelName }) => (
    <div className="header">
        <Header textAlign="center">#{channelName}</Header>
    </div>
)

HeaderWrapper.propTypes = {
    channelName: PropTypes.string.isRequired
}

export default HeaderWrapper
