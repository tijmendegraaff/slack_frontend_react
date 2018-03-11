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
        console.log(this.state)
    }

    async onSumbit() {
        const { email, password } = this.state
        await this.props
            .mutate({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            })
            .then(() => {
                this.props.history.push('/')
            })
            .catch((err) => {
                console.log(err)
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
                    {emailError ? <Message size="tiny">{emailError}</Message> : null}
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
