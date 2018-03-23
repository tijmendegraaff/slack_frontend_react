import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

const SendMessageWrapper = ({
    channelName,
    onKeyDown,
    message,
    onChange,
    name
    // isSubmitting
}) => (
    // console.log(this.props)
    <div className="input">
        <Input
            // disable submitting if already submitting
            name={name}
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
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default SendMessageWrapper
