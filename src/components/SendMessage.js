import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

const SendMessage = ({ channelName }) => (
    <div className="input">
        <Input fluid placeholder={`Message #${channelName}`} />
    </div>
)

// SendMessage.propTypes = {
//     children: PropTypes.any.isRequired
// }

export default SendMessage
