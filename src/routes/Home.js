import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import usersQuery from '../graphql/queries/usersQuery'

const Home = ({ data: { loading, users } }) =>
    (loading ? <div>Loading....</div> : users.map(user => <div key={user.id}>{user.userName}</div>))

Home.propTypes = {
    data: PropTypes.object.isRequired
}
export default graphql(usersQuery)(Home)
