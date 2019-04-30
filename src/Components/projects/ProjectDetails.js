import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Panel, Label } from 'react-bootstrap'
import  moment  from 'moment'
import { updateProject } from '../../store/actions/projectActions'


class ProjectDetails extends Component {
    constructor(props) {
        super(props);

       if(props.project) {
        this.state = {
            ...this.state,
            title: props.project.title,
            content: props.project.content,
            firstName : props.project.firstName,
            lastName: props.project.lastName,
            createdAt: props.project.createdAt,
          };}
      }

    handleChange = (e) => {
        this.setState ({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit =(e) => {
        e.preventDefault()
        this.props.updateProject(this.state, this.props.match.params.id)
        this.props.history.push('/projects');
    }

    render() {
        const { project, auth } = this.props
        console.log(project)
        if (!auth.uid || !this.state) return <Redirect to= '/signin' />
        const updatedByLabels = project && project.updatedAt ? <div>
        <p><Label bsStyle="default">Last Updated by</Label> { project.updatedByFirstName } { project.updatedByLastName }</p>
        <p><Label bsStyle="default">Last Updated at</Label> { moment(project.updatedAt.toDate()).calendar() }</p></div> : null;
    
        if (project) {
            return (
                <Col smOffset={2} sm={8}>
                <Panel>
                <Panel.Heading>PROJECT DETAILS</Panel.Heading>
                <Panel.Body>
                <Form horizontal onSubmit={this.handleSubmit} >
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                    Title
                    </Col>
                    <Col sm={10}>
                    <FormControl defaultValue={project.title} id="title" type="text" placeholder={project.title} required onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                    Content
                    </Col>
                    <Col sm={10}>
                    <FormControl defaultValue={project.content} id="content"  componentClass="textarea" placeholder="Content" required onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <p><Label bsStyle="default">Created by</Label> { project.firstName } { project.lastName }</p>
                    <p><Label bsStyle="default">Created at</Label> { moment(project.createdAt.toDate()).calendar() }</p>
                    { updatedByLabels }
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <Button bsStyle="primary" type="submit">UPDATE</Button>
                    </Col>
                </FormGroup>
                </Form>
                </Panel.Body> 
                <Panel.Footer></Panel.Footer>
            </Panel> 
            </Col>
                )
            } else  return <p>Loading...</p>
        }
    }

    const mapStateToProps = (state, ownProps) => {
        
        const id = ownProps.match.params.id
        const projects = state.firestore.data.projects
        const project = projects ? projects[id] : null
        return {
            project: project,
            profile: state.firebase.profile,
            auth: state.firebase.auth
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            updateProject: (project, key) => dispatch(updateProject(project, key))
        }
    }
    
    export default compose(
        connect(mapStateToProps, mapDispatchToProps),
        firestoreConnect ([
            { collection: 'projects' }
        ])
    )(ProjectDetails)