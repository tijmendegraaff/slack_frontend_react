import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

const SendMessageWrapper = ({ channelName }) => (
    <div className="input">
        <Input fluid placeholder={`Message #${channelName}`} />
    </div>
)

SendMessageWrapper.propTypes = {
    channelName: PropTypes.string.isRequired
}

export default SendMessageWrapper
