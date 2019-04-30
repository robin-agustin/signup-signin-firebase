import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect}  from 'react-redux-firebase'
import { compose } from 'redux'
import ProjectSummary from './ProjectSummary'
import { ListGroup, Panel, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const ProjectList = (props) => {

    const { projects, profile, auth } = props
    if (!auth.uid) return <Redirect to= '/signin' />

    if (projects) {
        return (
            <Col smOffset={2} sm={8}>
                <Panel>
                    <Panel.Heading>PROJECT LIST</Panel.Heading>
                    <Panel.Body>
                    <ListGroup>
                    { projects && projects.map(project => {
                            return (
                                <ProjectSummary profile={profile} project={project} key={project.id} />
                            )
                        })} 
                    </ListGroup>
                    </Panel.Body>
                    <Panel.Footer></Panel.Footer>
                </Panel>
            </Col>
            )} 
            else return <Col smOffset={5} sm={8}><p>Loading...</p></Col>
        }

const mapStateToProps = (state) => {
    
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['title', 'asc'] }

    ])
)(ProjectList)
