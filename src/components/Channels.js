import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line
const channel = ({ id, name }) => (
    <li key={`channel-${id}`} className="channel-list-item">
        # {name}
    </li>
)

const ActiveUserSpan = () => <span className="blue">●</span>

// eslint-disable-next-line
const user = ({ id, name, active }) => (
    <li key={`user-${id}`} className="channel-list-item">
        {!active ? <ActiveUserSpan /> : '○'} {name}
    </li>
)

const Channels = ({
    teamName, username, channels, users
}) => (
    <div className="channels">
        <h1 className="channel-title">{teamName}</h1>
        <h1 className="channel-username">{username}</h1>
        <ul className="channel-list">
            <li className="channel-list-header">Channels</li>
            {channels.map(channel)}
        </ul>
        <ul className="channel-list">
            <li className="channel-list-header">Users</li>
            {users.map(user)}
        </ul>
    </div>
)

Channels.propTypes = {
    teamName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    channels: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired
}

export default Channels
