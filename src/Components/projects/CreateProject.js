import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Panel } from 'react-bootstrap'

class CreateProject extends Component {

    state = {
        title: '',
        content: ''
    }
    handleChange = (e) => {
        this.setState ({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit =(e) => {
        e.preventDefault()
        this.props.createProject(this.state)
        this.props.history.push('/projects');
    }

    render() {
        const { auth } = this.props;
        
        if (!auth.uid) return <Redirect to= '/signin' />

        return (
            <Col smOffset={2} sm={8}>
            <Panel>
                <Panel.Heading>ADD PROJECT</Panel.Heading>
                <Panel.Body>
                <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                    Title
                    </Col>
                    <Col sm={10}>
                    <FormControl id="title" type="text" placeholder="Title" required onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                    Content
                    </Col>
                    <Col sm={10}>
                    <FormControl id="content"  componentClass="textarea" placeholder="Content" required onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <Button bsStyle="primary" type="submit">Add Project</Button>
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
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)