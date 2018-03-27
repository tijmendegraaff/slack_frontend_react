import React, { Component } from 'react'
import { Container, Header, Button, Message, Form } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import createSessionMutation from '../graphql/mutations/createSessionMutation'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: ''
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
        const { email, password } = this.state
        const { history } = this.props
        await this.props
            .mutate({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            })
            .then((res) => {
                localStorage.setItem('token', res.data.createSession.token)
                if (!res.data.createSession.user.teams[0]) {
                    history.push('/create-team')
                }
                history.push(`/dashboard/${res.data.createSession.user.teams[0].id}/${
                    res.data.createSession.user.teams[0].channels[0].id
                }`)
            })
            .catch((err) => {
                const { message } = err.graphQLErrors[0]
                this.setState({
                    emailError: message,
                    passwordError: message
                })
            })
    }

    render() {
        const {
            email, emailError, password, passwordError
        } = this.state
        return (
            <Container text>
                <Form>
                    <br />
                    <Header as="h2">Login</Header> <br />
                    <Form.Field error={!!emailError}>
                        <label>Email</label>
                        <input
                            placeholder="Email"
                            name="email"
                            onChange={this.onChange}
                            value={email}
                        />
                    </Form.Field>
                    <Form.Field error={!!passwordError}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={this.onChange}
                            value={password}
                        />
                    </Form.Field>
                    {passwordError ? <Message size="tiny">{passwordError}</Message> : null}
                    <Button type="button" onClick={this.onSumbit} size="big">
                        Login
                    </Button>
                    <Button
                        type="button"
                        onClick={() => this.props.history.push('/register')}
                        size="big"
                        basic
                    >
                        Register
                    </Button>
                    <Header as="h3"> Forgot your password ? Click here </Header>
                </Form>
            </Container>
        )
    }
}

LoginPage.propTypes = {
    history: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired
}

export default graphql(createSessionMutation)(LoginPage)
