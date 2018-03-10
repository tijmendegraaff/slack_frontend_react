import React, { Component } from 'react'
import { Container, Header, Input, Button } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import createUserMutation from '../graphql/mutations/createUserMutation'

// import { Link } from 'react-router-dom'

class RegisterPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSumbit = this.onSumbit.bind(this)
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    async onSumbit() {
        const {
            firstName, lastName, userName, email, password,
        } = this.state
        const res = await this.props.mutate({
            variables: {
                input: {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password,
                },
            },
        })
        console.log(res)
    }

    render() {
        const {
            firstName, lastName, userName, email, password, confirmPassword,
        } = this.state
        return (
            <Container text>
                <br />
                <Header as="h2">Register</Header>
                <br />
                <Input
                    name="firstName"
                    onChange={this.onChange}
                    placeholder="First Name"
                    value={firstName}
                    fluid
                />
                <br />
                <Input
                    name="lastName"
                    onChange={this.onChange}
                    placeholder="Last Name"
                    value={lastName}
                    fluid
                />
                <br />
                <Input
                    name="userName"
                    onChange={this.onChange}
                    placeholder="User Name"
                    value={userName}
                    fluid
                />
                <br />
                <Input
                    name="email"
                    onChange={this.onChange}
                    placeholder="Email"
                    value={email}
                    fluid
                />
                <br />
                <Input
                    name="password"
                    onChange={this.onChange}
                    placeholder="Password"
                    type="password"
                    value={password}
                    fluid
                />
                <br />
                <Input
                    name="confirmPassword"
                    onChange={this.onChange}
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    fluid
                />
                <br />
                <Button onClick={this.onSumbit} size="big">
                    Register
                </Button>
                <Button size="big" basic>
                    Login
                </Button>
                <Header as="h3">Forgot your password? Click here</Header>
            </Container>
        )
    }
}

RegisterPage.propTypes = {
    mutate: PropTypes.func.isRequired,
}

export default graphql(createUserMutation)(RegisterPage)
