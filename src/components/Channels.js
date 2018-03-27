import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Icon, Label } from 'semantic-ui-react'

// eslint-disable-next-line
const channel = ({ id, name }, teamId) => (
    <Link key={`channel-${id}`} to={`/dashboard/${teamId}/${id}`}>
        <li className="channel-list-item"># {name}</li>
    </Link>
)

const ActiveUserSpan = () => <span className="blue">●</span>

// eslint-disable-next-line
const directMessageChannel = ({ id, name, active, members }, teamId) => (
    <Link key={`dm-channel-${id}`} to={`/dashboard/${teamId}/${id}`}>
        <li className="channel-list-item">
            {!active ? <ActiveUserSpan /> : '○'}{' '}
            {members.map(member => (
                <Label size="mini" key={member.userName}>
                    {member.userName}
                </Label>
            ))}
        </li>
    </Link>
)

const Channels = ({
    teamName,
    username,
    channels,
    directMessageChannels,
    toggleAdChannelModal,
    teamId,
    toggleAddUsersToTeamModal,
    toggleDirectMessageModal,
    currentUser,
    owner
}) => (
    <div className="channels">
        <h1 className="channel-title">{teamName}</h1>
        <h1 className="channel-username">{username}</h1>
        <ul className="channel-list">
            <li className="channel-list-header">
                Channels{' '}
                {currentUser.id === owner && (
                    <Icon name="add circle" onClick={toggleAdChannelModal} />
                )}
            </li>
            {channels.map(c => channel(c, teamId))}
        </ul>
        <ul className="channel-list">
            <li className="channel-list-header">
                Direct Messages <Icon name="add circle" onClick={toggleDirectMessageModal} />
            </li>
            {directMessageChannels.map(c => directMessageChannel(c, teamId))}
        </ul>
        {currentUser.id === owner && (
            <div>
                <a href="#invite-people" onClick={toggleAddUsersToTeamModal}>
                    <h1 className="channel-username">Add users</h1>
                </a>
            </div>
        )}
    </div>
)

Channels.propTypes = {
    teamName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    channels: PropTypes.array.isRequired,
    directMessageChannels: PropTypes.array.isRequired,
    toggleAdChannelModal: PropTypes.func.isRequired,
    toggleAddUsersToTeamModal: PropTypes.func.isRequired,
    toggleDirectMessageModal: PropTypes.func.isRequired,
    teamId: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
    owner: PropTypes.string.isRequired
}

export default Channels
