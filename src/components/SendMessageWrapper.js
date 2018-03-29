import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

const SendMessageWrapper = ({
    onKeyDown,
    message,
    onChange,
    name,
    chatInputPlaceholder
    // isSubmitting
}) => (
    <div className="input">
        <Input
            // disable submitting if already submitting
            name={name}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={message}
            // disabled={isSubmitting}
            fluid
            placeholder={`Message #${chatInputPlaceholder}`}
        />
    </div>
)

SendMessageWrapper.propTypes = {
    chatInputPlaceholder: PropTypes.string.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default SendMessageWrapper
