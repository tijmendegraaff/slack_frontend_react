import React, { Component } from 'react'
import { Container, Header, Button, Message, Form } from 'semantic-ui-react'
// import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

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
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }

    onSumbit(e) {
        e.preventDefault()
        console.log(this.state)
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
                            placeholder="password"
                            name="password"
                            onChange={this.onChange}
                            value={password}
                        />
                    </Form.Field>
                    {passwordError ? <Message size="tiny">{passwordError}</Message> : null}
                    <Button onClick={this.onSumbit} size="big">
                        Login{' '}
                    </Button>{' '}
                    <Button onClick={() => this.props.history.push('/register')} size="big" basic>
                        Register{' '}
                    </Button>{' '}
                    <Header as="h3"> Forgot your password ? Click here </Header>{' '}
                </Form>
            </Container>
        )
    }
}

LoginPage.propTypes = {
    history: PropTypes.object.isRequired
}

export default LoginPage
