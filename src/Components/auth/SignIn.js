import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect, Link } from 'react-router-dom'
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Panel, Alert } from 'react-bootstrap'

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState ({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state)
    }

    render() {
        const { authError, auth, loading } = this.props;
        if (auth.uid) return <Redirect to= '/' />

        return (
            <Col smOffset={3} sm={6}>
            <Panel>
                <Panel.Heading>LOGIN</Panel.Heading>
                <Panel.Body>
                <Form horizontal onSubmit={this.handleSubmit} >
                <FormGroup>
                    <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                    Email
                    </Col>
                    <Col sm={6}>
                    <FormControl id="email" type="email" placeholder="Email" onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                    Password
                    </Col>
                    <Col sm={6}>
                    <FormControl id="password" type="password" placeholder="Password" onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                <Col componentClass={ControlLabel} smOffset={2} sm={6}>
                <p className="message">Not registered? <Link to='/signup'>Create an account</Link></p>
                </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={6}>
                    <Button bsStyle ="primary" type="submit"
                            disabled={loading} >
                            {loading ? 'Signing in...' : 'SIGN IN'}
                    </Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={12}>
                    { authError ? <Alert bsStyle="warning">
                                  <strong> { authError }</strong>
                                  </Alert> : null }
                    </Col>
                </FormGroup>                 
                </Form>
                </Panel.Body> 
                <Panel.Footer></Panel.Footer>
            </Panel> 
            </Col>
            )
        }
    }

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        loading: state.auth.loading,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)