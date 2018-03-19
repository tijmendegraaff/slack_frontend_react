import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line
const team = ({ id, name }) => (
    <li key={`team-${id}`} className="team-list-item">
        {name.charAt(0).toUpperCase()}
    </li>
)

const Teams = ({ teams, addTeam }) => (
    <div className="teams">
        <ul className="team-list">
            {teams.map(team)}
            <button className="team-list-item" onClick={addTeam}>
                +
            </button>
        </ul>
    </div>
)

Teams.propTypes = {
    teams: PropTypes.array.isRequired,
    addTeam: PropTypes.func.isRequired
}

export default Teams
