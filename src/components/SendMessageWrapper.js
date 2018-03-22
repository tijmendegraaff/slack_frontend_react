import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

const SendMessageWrapper = ({
    channelName,
    onKeyDown,
    message,
    messageError,
    onChange,
    isSubmitting
}) => (
    <div className="input">
        <Input
            // disable submitting if already submitting
            name="message"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={message}
            // disabled={isSubmitting}
            fluid
            placeholder={`Message #${channelName}`}
        />
    </div>
)

SendMessageWrapper.propTypes = {
    channelName: PropTypes.string.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    messageError: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired
}

export default SendMessageWrapper
