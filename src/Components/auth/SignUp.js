import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Panel, Alert } from 'react-bootstrap'

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        type: 'admin'
    }
    handleChange = (e) => {
        this.setState ({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit =(e) => {
        e.preventDefault()
        this.props.signUp(this.state)
    }

    render() {
        const { auth, authError, loading } = this.props;
        if (auth.uid) return <Redirect to= '/' />
  
        return (
            <Col smOffset={3} sm={6}>
            <Panel>
                <Panel.Heading>SIGN UP</Panel.Heading>
                <Panel.Body>
                <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                    First Name
                    </Col>
                    <Col sm={6}>
                    <FormControl type="text" id="firstName" placeholder="First Name" required onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                    Last Name
                    </Col>
                    <Col sm={6}>
                    <FormControl type="text" id="lastName" placeholder="Last Name" required onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                    Email
                    </Col>
                    <Col sm={6}>
                    <FormControl type="email" id="email" placeholder="Email" required onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                    Password
                    </Col>
                    <Col sm={6}>
                    <FormControl type="password" id="password" placeholder="Password" required onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                <Col componentClass={ControlLabel} smOffset={2} sm={6}>
                    <p className="message">Already have an account? <Link to='/signin'>Sign in</Link></p>
                </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={6}>
                    <Button bsStyle="primary" type="submit"
                            disabled={loading} >
                            {loading ? 'Signing up...' : 'SIGNUP'}
                    </Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                { authError ? <Alert bsStyle="warning">
                                  <strong>{ authError }</strong>
                                  </Alert> : null }
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
        auth: state.firebase.auth,
        authError: state.auth.authError,
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

