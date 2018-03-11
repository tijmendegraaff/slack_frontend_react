import React, { Component } from 'react'
import { Container, Header, Input, Button, Message, Form } from 'semantic-ui-react'
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
                    this.setState(errors)
                })
        } else {
            this.setState({
                passwordError: "passwords don't match",
                confirmPasswordError: "passwords don't match"
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
            confirmPassword,
            confirmPasswordError
        } = this.state
        return (
            <Container text>
                <Form>
                    <br />
                    <Header as="h2"> Register </Header> <br />
                    <Input
                        name="firstName"
                        error={!!firstNameError}
                        onChange={this.onChange}
                        placeholder="First Name"
                        value={firstName}
                        fluid
                    />
                    {firstNameError ? <Message size="tiny">{firstNameError}</Message> : <br />}
                    <Input
                        name="lastName"
                        error={!!lastNameError}
                        onChange={this.onChange}
                        placeholder="Last Name"
                        value={lastName}
                        fluid
                    />
                    {lastNameError ? <Message size="tiny">{lastNameError}</Message> : <br />}
                    <Input
                        name="userName"
                        error={!!userNameError}
                        onChange={this.onChange}
                        placeholder="User Name"
                        value={userName}
                        fluid
                    />
                    {userNameError ? <Message size="tiny">{userNameError}</Message> : <br />}
                    <Input
                        name="email"
                        error={!!emailError}
                        onChange={this.onChange}
                        placeholder="Email"
                        value={email}
                        fluid
                    />
                    {emailError ? <Message size="tiny">{emailError}</Message> : <br />}
                    <Input
                        name="password"
                        error={!!passwordError}
                        onChange={this.onChange}
                        placeholder="Password"
                        type="password"
                        value={password}
                        fluid
                    />
                    {passwordError ? <Message size="tiny">{passwordError}</Message> : <br />}
                    <Input
                        name="confirmPassword"
                        error={!!confirmPasswordError}
                        onChange={this.onChange}
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        fluid
                    />
                    <br />
                    <Button onClick={this.onSumbit} size="big">
                        Register{' '}
                    </Button>{' '}
                    <Button onClick={() => this.props.history.push('/login')} size="big" basic>
                        Login{' '}
                    </Button>{' '}
                    <Header as="h3"> Forgot your password ? Click here </Header>{' '}
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
