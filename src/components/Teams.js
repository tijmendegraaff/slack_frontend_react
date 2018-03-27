import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// eslint-disable-next-line
const team = ({ id, name, channels }) => (
    <Link key={`team-${id}`} to={`/dashboard/${id}/${channels[0].id}`}>
        <li className="team-list-item">{name.charAt(0).toUpperCase()}</li>
    </Link>
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
