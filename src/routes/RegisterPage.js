import React, { Component } from 'react'
import { Container, Header, Button, Message, Form } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import _ from 'lodash'
import createUserMutation from '../graphql/mutations/createUserMutation'

class RegisterPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSumbit = this.onSumbit.bind(this)
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    async onSumbit() {
        const initialerrorsState = {
            firstNameError: '',
            lastNameError: '',
            userNameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: ''
        }
        this.setState(initialerrorsState)
        const {
            firstName, lastName, userName, email, password
        } = this.state
        if (this.state.password === this.state.confirmPassword) {
            await this.props
                .mutate({
                    variables: {
                        input: {
                            firstName,
                            lastName,
                            userName,
                            email,
                            password
                        }
                    }
                })
                .then(() => {
                    this.props.history.push('/')
                })
                .catch((err) => {
                    const errors = {}
                    err.graphQLErrors.forEach(({ key, message }) => {
                        errors[`${_.camelCase(key)}Error`] = message[0]
                    })
                    this.setState({ password: '', confirmPassword: '' })
                    this.setState(errors)
                })
        } else {
            this.setState({
                passwordError: "passwords don't match"
            })
        }
    }

    render() {
        const {
            firstName,
            firstNameError,
            lastName,
            lastNameError,
            userName,
            userNameError,
            email,
            emailError,
            password,
            passwordError,
            confirmPassword
        } = this.state
        return (
            <Container text>
                <Form>
                    <br />
                    <Header as="h2"> Register </Header> <br />
                    <Form.Group unstackable widths={2}>
                        <Form.Field error={!!firstNameError}>
                            <label>First Name</label>
                            <input
                                name="firstName"
                                onChange={this.onChange}
                                placeholder="First Name"
                                value={firstName}
                            />
                            {firstNameError && <Message size="tiny">{firstNameError}</Message>}
                        </Form.Field>

                        <Form.Field error={!!lastNameError}>
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                onChange={this.onChange}
                                placeholder="Last Name"
                                value={lastName}
                            />
                            {lastNameError && <Message size="tiny">{lastNameError}</Message>}
                        </Form.Field>
                    </Form.Group>
                    <Form.Field error={!!userNameError}>
                        <label>User Name</label>
                        <input
                            name="userName"
                            onChange={this.onChange}
                            placeholder="user Name"
                            value={userName}
                        />
                    </Form.Field>
                    {userNameError && <Message size="tiny">{userNameError}</Message>}
                    <Form.Field error={!!emailError}>
                        <label>Email</label>
                        <input
                            name="email"
                            onChange={this.onChange}
                            placeholder="email"
                            value={email}
                        />
                    </Form.Field>
                    {emailError && <Message size="tiny">{emailError}</Message>}
                    <Form.Field error={!!passwordError}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={this.onChange}
                            placeholder="password"
                            value={password}
                        />
                    </Form.Field>
                    {passwordError && <Message size="tiny">{passwordError}</Message>}
                    <Form.Field error={!!passwordError}>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={this.onChange}
                            placeholder="password"
                            value={confirmPassword}
                        />
                    </Form.Field>
                    <Button type="button" onClick={this.onSumbit} size="big">
                        Register
                    </Button>
                    <Button
                        type="button"
                        onClick={() => this.props.history.push('/login')}
                        size="big"
                        basic
                    >
                        Login
                    </Button>
                    <Header as="h3"> Forgot your password ? Click here </Header>
                </Form>
            </Container>
        )
    }
}

RegisterPage.propTypes = {
    mutate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default graphql(createUserMutation)(RegisterPage)
