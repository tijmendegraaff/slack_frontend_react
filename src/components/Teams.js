import React from 'react'
import PropTypes from 'prop-types'

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
    teams: PropTypes.array.isRequired
}

export default Teams
