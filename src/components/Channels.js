import React from 'react'
import PropTypes from 'prop-types'

const channel = ({ id, name }) => <li key={`channel-${id}`}>{name}</li>

const user = ({ id, name }) => <li key={`user-${id}`}>{name}</li>

const Channels = ({
    teamName, username, channels, users
}) => (
    <div className="channels">
        <div>
            {teamName}
            {username}
        </div>
        <div>
            <ul>
                <li>Channels</li>
                {channels.map(channel)}
            </ul>
        </div>
        <div>
            <ul>
                <li>Users</li>
                {users.map(user)}
            </ul>
        </div>
    </div>
)

// Channels.propTypes = {
//     children: PropTypes.any.isRequired
// }

export default Channels
