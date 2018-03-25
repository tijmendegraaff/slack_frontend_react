import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

const MultiSelectUserInput = ({
    selectedMembers,
    handleChange,
    placeholder,
    members,
    currentUserId
}) => {
    console.log(selectedMembers)
    return (
        <Dropdown
            value={selectedMembers}
            onChange={(e, { value }) => handleChange(e, { value })}
            placeholder={placeholder}
            fluid
            multiple
            search
            selection
            options={members
                .filter(member => member.id !== currentUserId)
                .map(member => ({ key: member.id, value: member.id, text: member.userName }))}
        />
    )
}

MultiSelectUserInput.propTypes = {
    selectedMembers: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    currentUserId: PropTypes.string.isRequired
}

export default MultiSelectUserInput
